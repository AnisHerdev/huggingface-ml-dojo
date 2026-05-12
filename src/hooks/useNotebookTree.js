import { useState, useEffect, useMemo } from 'react';

export function useNotebookTree() {
  const [notebookPaths, setNotebookPaths] = useState([]);
  const [fetchStatus, setFetchStatus] = useState("idle");
  const [fetchError, setFetchError] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);

  const fetchNotebookTree = async () => {
    setFetchStatus("loading");
    try {
      const response = await fetch("https://api.github.com/repos/huggingface/notebooks/git/trees/main?recursive=1");
      if (response.status === 403) {
        const data = await response.json().catch(() => ({}));
        if (data.message && data.message.includes("rate limit")) {
          setFetchError("GitHub rate limit reached. Wait ~1 hour or try again later.");
        } else {
          setFetchError("Failed to fetch: " + response.status);
        }
        setFetchStatus("error");
        return;
      }
      if (!response.ok) {
        setFetchError("Failed to fetch: " + response.status);
        setFetchStatus("error");
        return;
      }
      const data = await response.json();
      const paths = data.tree.filter(item => item.type === "blob" && item.path.endsWith(".ipynb")).map(item => item.path);
      setNotebookPaths(paths);
      setFetchStatus("success");
      setLastFetched(new Date());
    } catch (error) {
      setFetchError("Network error. Check your connection.");
      setFetchStatus("error");
    }
  };

  useEffect(() => {
    fetchNotebookTree();
  }, []);

  const buildTree = (paths) => {
    const mapping = [
      { prefix: "course/en/", label: "HF Course (English)" },
      { prefix: "course/videos/", label: "Video Tutorials" },
      { prefix: "course/", label: "HF Course (Other Languages)" },
      { prefix: "diffusers_doc/", label: "Diffusers Docs" },
      { prefix: "diffusers/", label: "Diffusers Notebooks" },
      { prefix: "transformers_doc/en/", label: "Transformers Docs" },
      { prefix: "peft_docs/", label: "PEFT" },
      { prefix: "peft/", label: "PEFT" },
      { prefix: "datasets-server_doc/", label: "Datasets" },
      { prefix: "datasets_doc/", label: "Datasets" },
      { prefix: "sagemaker/", label: "SageMaker" },
      { prefix: "smolagents_doc/", label: "SmolAgents" },
      { prefix: "setfit_doc/", label: "SetFit" },
      { prefix: "examples/", label: "Examples" }
    ];

    const getSection = (path) => {
      for (const m of mapping) {
        if (path.startsWith(m.prefix)) {
          return { label: m.label, remainder: path.slice(m.prefix.length) };
        }
      }
      return { label: "Other", remainder: path };
    };

    const tree = {};
    paths.forEach(path => {
      const { label, remainder } = getSection(path);
      if (!tree[label]) {
        tree[label] = { notebooks: [], folders: {} };
      }
      
      const parts = remainder.split("/");
      const filename = parts.pop();
      const name = filename.replace(/\.ipynb$/, "");
      
      let current = tree[label];
      let currentPathSegments = [];
      parts.forEach(part => {
        currentPathSegments.push(part);
        const folderKey = currentPathSegments.join("/");
        if (!current.folders[part]) {
          current.folders[part] = { notebooks: [], folders: {}, folderKey };
        }
        current = current.folders[part];
      });
      
      current.notebooks.push({ name, path, label, folderKey: parts.join("/") });
    });
    return tree;
  };

  const tree = useMemo(() => buildTree(notebookPaths), [notebookPaths]);

  return {
    notebookPaths,
    tree,
    fetchStatus,
    fetchError,
    lastFetched,
    fetchNotebookTree
  };
}
