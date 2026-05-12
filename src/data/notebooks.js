export const notebookDescriptions = {
  "inside_pipeline_pt": "Walks through what happens inside a pipeline() call — tokenization, model forward pass, and post-processing. Shows how to replicate pipeline behavior manually using AutoTokenizer and AutoModel.",
  "inside_pipeline_tf": "Walks through what happens inside a pipeline() call — tokenization, model forward pass, and post-processing. Shows how to replicate pipeline behavior manually using AutoTokenizer and AutoModel.",
  "pipeline_function": "Demonstrates the pipeline() factory function for common NLP tasks. Covers task strings, model selection, and batched inference.",
  "tokenizer_pipeline": "Explores how tokenizers plug into the pipeline abstraction. Shows tokenizer output shapes and how they feed into model inputs.",
  "trainer_api": "Full walkthrough of the HuggingFace Trainer class for fine-tuning. Covers TrainingArguments, evaluation strategies, and checkpointing.",
  "training_loop": "Builds a custom PyTorch training loop without the Trainer API. Covers optimizer setup, gradient accumulation, and evaluation.",
  "semantic_search": "Builds a semantic search engine using sentence embeddings and FAISS. Covers encoding, indexing, and querying by similarity.",
  "fast_tokenizers": "Explores the Rust-backed fast tokenizers and their offset mapping features. Covers speed benchmarks and token-to-character alignment.",
  "building_tokenizer": "Trains a tokenizer from scratch on a custom corpus. Covers BPE and WordPiece algorithms and vocabulary construction.",
  "train_new_tokenizer": "Shows how to train a new tokenizer from an existing one using train_new_from_iterator. Covers corpus preparation and special token handling.",
  "domain_adaptation": "Fine-tunes a pretrained language model on domain-specific text using masked language modeling. Covers continued pretraining techniques.",
  "annotated_diffusion": "Annotated implementation of a diffusion model (DDPM) from scratch in PyTorch. Covers the forward noising process, U-Net architecture, and reverse denoising.",
  "stable_diffusion": "Introduces Stable Diffusion inference using the diffusers library. Covers the StableDiffusionPipeline, prompt engineering, and image generation parameters.",
  "image_2_image_using_diffusers": "Demonstrates image-to-image generation with Stable Diffusion. Covers strength parameter, prompt guidance, and conditioning on an input image.",
  "in_painting_with_stable_diffusion_using_diffusers": "Walks through inpainting with Stable Diffusion — selectively regenerating masked regions of an image using a prompt.",
  "controlnet": "Shows how to use ControlNet to guide Stable Diffusion generation with structural inputs like edge maps, pose, and depth.",
  "dreambooth": "Fine-tunes Stable Diffusion on a small set of subject images using DreamBooth. Covers the training loop, prior preservation loss, and inference.",
  "lora": "Applies LoRA (Low-Rank Adaptation) to fine-tune a large model with minimal trainable parameters. Covers rank selection, adapter injection, and merging.",
  "text_classification": "Fine-tunes a BERT-style model on a text classification dataset. Covers tokenization, dataset preparation, Trainer setup, and evaluation metrics.",
  "question_answering": "Fine-tunes a model for extractive QA on SQuAD. Covers context/question tokenization, span prediction, and postprocessing.",
  "summarization": "Fine-tunes a seq2seq model (T5/BART) for abstractive summarization. Covers input truncation, target length, and ROUGE evaluation.",
  "translation": "Fine-tunes a seq2seq model for machine translation. Covers language pair tokenization, beam search, and BLEU scoring.",
  "token_classification": "Fine-tunes a model for NER and POS tagging. Covers word-to-token alignment, label mapping, and seqeval metrics.",
  "language_modeling": "Fine-tunes a causal language model for text generation. Covers dataset chunking, cross-entropy loss, and perplexity evaluation.",
  "masked_language_modeling": "Fine-tunes a masked language model using the MLM objective. Covers data collation with random masking and whole-word masking.",
  "preprocessing": "Covers all preprocessing steps for NLP tasks — tokenization, padding, truncation, and batching with the datasets library.",
  "quicktour": "A fast overview of the HuggingFace Transformers library. Covers pipeline(), AutoModel, AutoTokenizer, and the Hub in under 10 minutes.",
  "training": "End-to-end fine-tuning walkthrough using both the Trainer API and a native PyTorch loop. Covers saving, loading, and pushing to the Hub.",
  "tokenizer_summary": "Explains the different tokenization algorithms (BPE, WordPiece, SentencePiece) and how they differ across model families.",
  "peft": "Introduces the PEFT library for parameter-efficient fine-tuning. Covers LoRA, prefix tuning, and prompt tuning with minimal code.",
  "llm_tutorial": "Practical guide to running inference with large language models. Covers text generation strategies, sampling parameters, and batching."
};

export const formatReadableTitle = (name) => {
  let title = name.replace(/[_-]/g, " ");
  title = title.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  title = title.replace(/ Pt$/i, " (PyTorch)");
  title = title.replace(/ Tf$/i, " (TensorFlow)");
  return title;
};

export const generateTags = (name) => {
  const nameLower = name.toLowerCase();
  const tags = [];
  if (nameLower.includes("pipeline")) tags.push("Pipeline");
  if (nameLower.includes("token")) tags.push("Tokenization");
  if (nameLower.includes("train") || nameLower.includes("finetune") || nameLower.includes("fine_tune")) tags.push("Training");
  if (nameLower.includes("diffusion") || nameLower.includes("sd_")) tags.push("Diffusion");
  if (nameLower.includes("lora") || nameLower.includes("peft") || nameLower.includes("dreambooth")) tags.push("Fine-Tuning");
  if (nameLower.includes("classif")) tags.push("Classification");
  if (nameLower.includes("qa") || nameLower.includes("question")) tags.push("QA");
  if (nameLower.endsWith("_pt")) tags.push("PyTorch");
  if (nameLower.endsWith("_tf")) tags.push("TensorFlow");
  if (nameLower.includes("image") || nameLower.includes("img") || nameLower.includes("vision")) tags.push("Vision");
  if (nameLower.includes("audio") || nameLower.includes("speech") || nameLower.includes("asr")) tags.push("Audio");
  if (nameLower.includes("summariz")) tags.push("Summarization");
  if (nameLower.includes("translat")) tags.push("Translation");
  return tags;
};
