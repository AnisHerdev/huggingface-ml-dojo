export const TOPICS = [
  {
    title: "Tokenization & Embeddings",
    concept: {
      explanation: "Tokenization is the process of breaking down raw text into smaller chunks called tokens, which can be words, characters, or subwords. Before a machine learning model can process text, it must be converted into numerical format. The tokenizer handles this, turning strings into arrays of integer token IDs. Embeddings then take these token IDs and map them to dense mathematical vectors in a high-dimensional space, where words with similar semantic meanings are grouped closer together.",
      underTheHood: [
        "Subword algorithms like Byte-Pair Encoding (BPE) or WordPiece balance vocabulary size by keeping common words intact and splitting rare words into subwords.",
        "An attention_mask is generated alongside token_ids to explicitly tell the model which tokens are real data and which are padding tokens.",
        "Word embeddings are effectively lookup tables: a token ID acts as an index to retrieve a specific, trainable floating-point vector."
      ],
      codeSnippet: `from transformers import AutoTokenizer

# Load a pretrained tokenizer from the Hugging Face Hub
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")

# Encode text into token IDs and an attention mask (returns PyTorch tensors)
inputs = tokenizer("Learning ML is fun!", return_tensors="pt")

# The output is a dictionary containing 'input_ids' and 'attention_mask'
print(inputs["input_ids"]) 
# Output: tensor([[ 101, 4083, 1045, 1055, 4569,  999,  102]])

# Decode back to a string to see the added special tokens like [CLS]
print(tokenizer.decode(inputs["input_ids"][0]))
# Output: [CLS] learning ml is fun! [SEP]`,
      glossary: [
        { term: "Token", definition: "A single unit of text (word, subword, or character) that the model processes." },
        { term: "Token ID", definition: "An integer representing a specific token in the tokenizer's vocabulary." },
        { term: "Attention Mask", definition: "A binary array indicating which tokens should be attended to (1) and which are padding (0)." },
        { term: "Embedding", definition: "A continuous vector representation of a token that captures its semantic meaning." }
      ],
      mistakes: [
        "Passing raw strings directly into a model instead of passing the tokenizer output.",
        "Using a tokenizer that doesn't match the model you are using (e.g., using a GPT-2 tokenizer with a BERT model)."
      ]
    },
    quiz: [
      {
        question: "What is the primary purpose of an attention mask?",
        options: [
          "To hide sensitive information from the model.",
          "To tell the model to ignore padding tokens during computation.",
          "To highlight the most important words in a sentence.",
          "To convert text into integer IDs."
        ],
        correct: 1,
        explanation: "The attention mask prevents the model's attention mechanism from calculating scores for padding tokens, which carry no meaning."
      },
      {
        question: "Under the hood, how does a model retrieve an embedding for a specific word?",
        options: [
          "By using the token ID as an index into a lookup table.",
          "By running a separate neural network on the token ID.",
          "By calculating the cosine similarity of the string.",
          "By applying a hash function to the raw text."
        ],
        correct: 0,
        explanation: "Embeddings act as a lookup table where each token ID corresponds to a specific row containing the vector representation."
      },
      {
        question: "What happens if you use a tokenizer trained for a different model?",
        options: [
          "The model will automatically adjust its vocabulary.",
          "The model will run slower.",
          "The token IDs won't align with the model's expected embeddings, producing nonsense.",
          "It will work fine as long as both are subword tokenizers."
        ],
        correct: 2,
        explanation: "Each model's embedding matrix is strictly tied to its specific tokenizer's vocabulary. Mismatching them results in the model reading the wrong words."
      },
      {
        question: "Which Hugging Face method converts a sequence of IDs back into human-readable text?",
        options: [
          "tokenizer.revert()",
          "tokenizer.encode()",
          "tokenizer.decode()",
          "tokenizer.textify()"
        ],
        correct: 2,
        explanation: "The decode() method translates a list of token IDs back into a string, often including special tokens."
      }
    ],
    colab: {
      title: "Tokenization in Practice",
      objective: [
        "Learn how to initialize different tokenizers.",
        "Observe how different algorithms split the same sentence.",
        "Understand the dictionary output format of the tokenizer."
      ],
      time: "~15 min",
      link: "https://colab.research.google.com/github/huggingface/notebooks/blob/main/course/en/chapter2/section4_pt.ipynb",
      lookFor: [
        "The difference in vocabulary sizes between different models.",
        "How unknown words are handled or broken down into subwords.",
        "The presence of special tokens like [CLS] or <s>."
      ],
      testPrompt: "If you change the input text to include a completely made-up word, how does the tokenizer handle it without crashing?"
    }
  },
  {
    title: "Pipelines — The Inference API",
    concept: {
      explanation: "The pipeline API is the easiest way to use models for inference in the Hugging Face ecosystem. It abstracts away the complex boilerplate code required to download a model, tokenize inputs, run the text through the model, and post-process the raw mathematical outputs into human-readable results. By simply specifying a task string, you get a ready-to-use object that handles the entire end-to-end workflow.",
      underTheHood: [
        "The pipeline() function is a factory method that instantiates specialized classes (like TextClassificationPipeline).",
        "It automatically downloads the default model and tokenizer for the requested task if none are provided.",
        "It manages moving tensors to the correct device (CPU, GPU, or Apple Silicon) using the device parameter."
      ],
      codeSnippet: `from transformers import pipeline

# Instantiate the pipeline for sentiment analysis using a factory function
# It automatically downloads a default model (e.g., distilbert-base-uncased-finetuned-sst-2-english)
classifier = pipeline(task="sentiment-analysis")

# Run inference directly on raw text
results = classifier("I absolutely loved the pacing of this movie!")

# Output is fully post-processed into readable labels and scores
print(results)
# Output: [{'label': 'POSITIVE', 'score': 0.998}]`,
      glossary: [
        { term: "Inference", definition: "Using a trained machine learning model to make predictions on new data." },
        { term: "Factory Function", definition: "A function that creates and returns objects of different classes based on input parameters." },
        { term: "Post-processing", definition: "Converting a model's raw numerical outputs (like logits) back into probabilities and string labels." },
        { term: "Device Mapping", definition: "Allocating model weights and inputs to specific hardware (like moving them to a GPU)." }
      ],
      mistakes: [
        "Forgetting that the default pipeline downloads a model automatically, which can use up disk space or network bandwidth.",
        "Trying to use a pipeline for complex training loops instead of inference."
      ]
    },
    quiz: [
      {
        question: "What does the pipeline abstraction primarily hide from the user?",
        options: [
          "The training loop and backpropagation.",
          "Tokenization, tensor operations, and output post-processing.",
          "The choice of programming language.",
          "The need to use a GPU."
        ],
        correct: 1,
        explanation: "Pipelines handle the end-to-end inference process: turning strings into tokens, running the model, and turning the raw tensor output back into human-readable labels."
      },
      {
        question: "Under the hood, what kind of programming pattern is pipeline()?",
        options: [
          "A Singleton.",
          "A Factory method.",
          "An Observer.",
          "A Decorator."
        ],
        correct: 1,
        explanation: "pipeline() is a factory function that returns a specific pipeline class (like TextGenerationPipeline) based on the task argument."
      },
      {
        question: "What happens if you initialize a pipeline without specifying a model?",
        options: [
          "It throws a ValueError.",
          "It randomly generates model weights.",
          "It uses a hardcoded default model associated with that specific task.",
          "It prompts you to input a model name in the terminal."
        ],
        correct: 2,
        explanation: "Hugging Face maintains a mapping of default models for every supported task so pipelines work out-of-the-box."
      },
      {
        question: "Which of the following is NOT a valid pipeline task?",
        options: [
          "text-classification",
          "fill-mask",
          "image-classification",
          "train-model"
        ],
        correct: 3,
        explanation: "Pipelines are strictly for inference. Training requires the Trainer API or custom training loops."
      }
    ],
    colab: {
      title: "Exploring Pipeline Tasks",
      objective: [
        "Initialize pipelines for different NLP tasks.",
        "Observe the default models downloaded.",
        "Experiment with batching inputs."
      ],
      time: "~10 min",
      link: "https://colab.research.google.com/github/huggingface/notebooks/blob/main/course/en/chapter1/section3.ipynb",
      lookFor: [
        "How the output format changes depending on the task (e.g., QA vs classification).",
        "The console output showing which model weights are being downloaded.",
        "How you can override the default model by passing a 'model' argument."
      ],
      testPrompt: "How would you modify the pipeline instantiation to run on your GPU instead of your CPU?"
    }
  },
  {
    title: "Training from Scratch — Sequential Models & LSTMs",
    concept: {
      explanation: "Before Transformers dominated NLP, Recurrent Neural Networks (RNNs) and LSTMs were the standard. Unlike traditional feedforward networks that process inputs independently, LSTMs have an internal memory state that processes sequences step-by-step, allowing them to remember past context. The Keras Sequential API provides a straightforward way to stack these layers sequentially to build a model from scratch.",
      underTheHood: [
        "A Sequential model assumes a linear stack of layers where each layer has exactly one input tensor and one output tensor.",
        "LSTMs (Long Short-Term Memory) use a complex system of gates (input, output, and forget gates) to solve the vanishing gradient problem, deciding what information to keep or discard.",
        "The Keras Embedding layer translates integer sequences into dense vectors, but unlike pretrained embeddings, its weights start random and are learned during training."
      ],
      codeSnippet: `import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense, Dropout

vocab_size = 10000
sequence_length = 50

# Build a linear stack of layers
model = Sequential([
    # 1. Convert integer tokens into 64-dimensional vectors
    Embedding(input_dim=vocab_size, output_dim=64, input_length=sequence_length),
    
    # 2. Process sequence with an LSTM. return_sequences=False means 
    # it only outputs the final hidden state after reading the whole sequence
    LSTM(64, return_sequences=False),
    
    # 3. Regularization to prevent overfitting
    Dropout(0.5),
    
    # 4. Final classification layer (binary sentiment: 0 or 1)
    Dense(1, activation='sigmoid')
])

# Compile the model with an optimizer and loss function
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])`,
      glossary: [
        { term: "Sequential API", definition: "A Keras interface for creating models layer-by-layer in a strict linear order." },
        { term: "LSTM", definition: "A type of recurrent layer capable of learning long-term dependencies via a gated cell state." },
        { term: "Vanishing Gradient", definition: "A problem where gradients get too small during backpropagation in deep/long networks, stopping them from learning." },
        { term: "Dropout", definition: "A regularization technique where random neurons are ignored during training to prevent overfitting." }
      ],
      mistakes: [
        "Feeding unpadded sequences to a Keras model; LSTMs expect fixed-size tensors in a batch.",
        "Using return_sequences=False when stacking multiple LSTM layers (the prior layers must return full sequences)."
      ]
    },
    quiz: [
      {
        question: "What primary problem do LSTMs solve compared to standard RNNs?",
        options: [
          "They process data in parallel instead of sequentially.",
          "The vanishing gradient problem for long sequences.",
          "They don't require tokenization.",
          "They use significantly less memory."
        ],
        correct: 1,
        explanation: "The gated architecture of an LSTM allows gradients to flow backwards through time more easily, mitigating the vanishing gradient problem."
      },
      {
        question: "Under the hood, how does an LSTM decide what information to discard from its cell state?",
        options: [
          "It uses a randomly initialized Dropout layer.",
          "It relies on the Embedding layer to filter data.",
          "It passes information through a sigmoid 'forget gate' layer.",
          "It inherently discards the oldest information in the sequence."
        ],
        correct: 2,
        explanation: "LSTMs use a forget gate (a neural net layer with a sigmoid activation) that outputs a number between 0 and 1 for each number in the cell state, deciding what to keep."
      },
      {
        question: "What is a constraint of the Keras Sequential API?",
        options: [
          "It cannot use GPU acceleration.",
          "It only supports single-input, single-output layer stacks.",
          "It does not support Dropout.",
          "It can only be used for image classification."
        ],
        correct: 1,
        explanation: "Sequential models strictly assume a linear topology. Models with multiple inputs, multiple outputs, or complex residual connections require the Keras Functional API."
      },
      {
        question: "Why might an Embedding layer's weights change during training?",
        options: [
          "Because they are updated via backpropagation to learn better vector representations for the specific task.",
          "Because of random noise introduced by Dropout.",
          "Because the vocabulary size is constantly changing.",
          "Because embeddings are dynamically generated every epoch."
        ],
        correct: 0,
        explanation: "When training from scratch, embedding weights are trainable parameters that adjust to minimize the loss function."
      }
    ],
    colab: {
      title: "Text Classification with RNNs",
      objective: [
        "Prepare text data using Keras preprocessing.",
        "Build a Sequential model with an Embedding and LSTM layer.",
        "Train the model and visualize the loss."
      ],
      time: "~25 min",
      link: "https://colab.research.google.com/github/huggingface/notebooks/blob/main/examples/language_modeling_from_scratch.ipynb",
      lookFor: [
        "The shape of the tensors as they pass from the Embedding layer to the LSTM.",
        "The impact of the pad_sequences function on the input data.",
        "How training accuracy changes compared to validation accuracy over epochs."
      ],
      testPrompt: "If you change the LSTM to a standard SimpleRNN, how does the final accuracy on validation data change?"
    }
  },
  {
    title: "Transformer Architecture Internals",
    concept: {
      explanation: "The Transformer revolutionized ML by completely discarding sequential processing (like LSTMs) in favor of 'Self-Attention'. This allows the model to look at all words in a sentence simultaneously and determine which words are most relevant to each other, regardless of their distance. This parallel nature makes Transformers highly efficient to train on GPUs.",
      underTheHood: [
        "Self-Attention calculates relevance by mapping inputs into three vectors: Query (Q), Key (K), and Value (V).",
        "Attention Score = Softmax((Q * K^T) / sqrt(d_k)). This formula calculates how much focus to place on other words.",
        "Multi-head attention runs several attention mechanisms in parallel, allowing the model to focus on different aspects of language simultaneously (e.g., grammar, meaning).",
        "Because sequences are processed in parallel, Positional Encodings are added to the input embeddings to give the model a sense of word order."
      ],
      hasDiagram: true,
      codeSnippet: `# A conceptual Python view of Scaled Dot-Product Attention
import torch
import torch.nn.functional as F
import math

def scaled_dot_product_attention(query, key, value):
    d_k = query.size(-1)
    
    # 1. Calculate raw attention scores via dot product of Q and K
    # Transpose key to match dimensions: (batch, seq_len, d_k) @ (batch, d_k, seq_len)
    scores = torch.matmul(query, key.transpose(-2, -1))
    
    # 2. Scale down by the square root of dimensions to prevent vanishing/exploding gradients in softmax
    scores = scores / math.sqrt(d_k)
    
    # 3. Apply softmax to get normalized probabilities (weights that sum to 1)
    attention_weights = F.softmax(scores, dim=-1)
    
    # 4. Multiply weights by the Values to get the final context-aware representation
    output = torch.matmul(attention_weights, value)
    
    return output, attention_weights`,
      glossary: [
        { term: "Self-Attention", definition: "A mechanism that relates different positions of a single sequence to compute a representation of the sequence." },
        { term: "Query, Key, Value", definition: "Abstract concepts borrowed from database retrieval used to compute attention." },
        { term: "Positional Encoding", definition: "Fixed or learned vectors added to embeddings to inject information about the relative or absolute position of tokens." },
        { term: "Encoder-Decoder", definition: "An architecture where an Encoder reads input text into a context vector, and a Decoder generates output text from it." }
      ],
      mistakes: [
        "Assuming Transformers process data left-to-right natively (they don't, they process the whole sequence at once).",
        "Confusing encoder-only models (BERT) with decoder-only models (GPT)."
      ]
    },
    quiz: [
      {
        question: "Under the hood, why are attention scores divided by the square root of the key dimension (d_k)?",
        options: [
          "To convert the values into probabilities.",
          "To prevent the dot products from growing too large and pushing the softmax function into regions with extremely small gradients.",
          "To reduce the memory footprint of the matrix multiplication.",
          "To add positional information to the tokens."
        ],
        correct: 1,
        explanation: "Without scaling, the dot products for large dimensions can become huge, making the softmax output very close to 1 or 0, which kills the gradient flow."
      },
      {
        question: "What is the role of the Query (Q) vector in self-attention?",
        options: [
          "It holds the actual content/meaning of the token.",
          "It represents what the token is 'looking for' in other tokens.",
          "It is used to mask out padding tokens.",
          "It injects positional encoding into the network."
        ],
        correct: 1,
        explanation: "The Query vector is matched against the Key vectors of all other tokens to calculate relevance."
      },
      {
        question: "Why do Transformers require Positional Encodings?",
        options: [
          "Because they process all tokens in parallel, they have no inherent concept of sequence order.",
          "To solve the vanishing gradient problem.",
          "To convert words into subwords.",
          "Because GPU memory is aligned sequentially."
        ],
        correct: 0,
        explanation: "Since attention operations are permutation invariant, positional encodings are mathematically added to the inputs so the model knows the position of each word."
      },
      {
        question: "What is the primary advantage of Multi-Head Attention over single-head attention?",
        options: [
          "It uses less GPU VRAM.",
          "It allows the model to jointly attend to information from different representation subspaces at different positions.",
          "It automatically splits the data across multiple GPUs.",
          "It replaces the need for feedforward layers."
        ],
        correct: 1,
        explanation: "Multiple heads allow the model to learn multiple complex relationships (like grammatical structure in one head, and pronoun reference in another) simultaneously."
      }
    ],
    colab: {
      title: "How Transformers Work",
      objective: [
        "Understand the mechanics of Self-Attention.",
        "Observe the differences between encoder and decoder blocks.",
        "Visualize attention heads."
      ],
      time: "~20 min",
      link: "https://colab.research.google.com/github/huggingface/notebooks/blob/main/course/en/chapter1/section8.ipynb",
      lookFor: [
        "The conceptual distinction between causal language modeling (decoders) and masked language modeling (encoders).",
        "How context length affects the computation.",
        "The block diagrams illustrating the flow of data through the attention layers."
      ],
      testPrompt: "Based on the reading, why is BERT considered an 'encoder-only' model, and what kind of tasks is it best suited for?"
    }
  },
  {
    title: "Fine-Tuning Pretrained Models",
    concept: {
      explanation: "Training a large language model from scratch requires massive compute resources. Fine-tuning uses Transfer Learning: taking a model that already understands language and training it slightly more on a specific, smaller dataset. The Hugging Face ecosystem provides the Trainer API to handle the complex training loops, device placement, and evaluation metrics.",
      underTheHood: [
        "AutoModelForSequenceClassification replaces the top 'head' (the final layer) of the pretrained model with a new, randomly initialized classification layer.",
        "During fine-tuning, the gradients update both the new classification head and the pretrained weights beneath it.",
        "The Trainer API encapsulates the standard PyTorch training loop (zeroing gradients, forward pass, loss calculation, backward pass, optimizer step).",
        "To save memory, techniques like LoRA (Low-Rank Adaptation) freeze the main weights and only train tiny adapter layers injected into the network."
      ],
      codeSnippet: `from transformers import AutoModelForSequenceClassification, TrainingArguments, Trainer
from datasets import load_dataset

# 1. Load a pre-trained model but replace the top layer for 2-class classification
model = AutoModelForSequenceClassification.from_pretrained("bert-base-uncased", num_labels=2)

# Assume 'tokenized_datasets' is already prepared using the datasets library
# 2. Define hyper-parameters
training_args = TrainingArguments(
    output_dir="./results",
    learning_rate=2e-5,
    per_device_train_batch_size=16,
    num_train_epochs=3,
    weight_decay=0.01,
)

# 3. Initialize the Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_datasets["train"],
    eval_dataset=tokenized_datasets["test"],
)

# 4. Start the fine-tuning process
trainer.train()`,
      glossary: [
        { term: "Fine-Tuning", definition: "Taking a pre-trained model and updating its weights on a specific dataset." },
        { term: "Transfer Learning", definition: "Applying knowledge learned from a broad task (like predicting the next word) to a narrower task (like classifying sentiment)." },
        { term: "Trainer API", definition: "A high-level Hugging Face class that abstracts away the boilerplate of PyTorch training loops." },
        { term: "LoRA", definition: "A Parameter-Efficient Fine-Tuning (PEFT) technique that injects trainable low-rank matrices into the model, saving VRAM." }
      ],
      mistakes: [
        "Forgetting to tokenize the dataset properly before passing it to the Trainer.",
        "Using a learning rate that is too high, which 'forgets' the pre-trained knowledge (catastrophic forgetting)."
      ]
    },
    quiz: [
      {
        question: "When initializing AutoModelForSequenceClassification, what happens under the hood?",
        options: [
          "The entire model is reinitialized with random weights.",
          "The pretrained weights are loaded, but the final language modeling head is replaced with a random classification head.",
          "The model's vocabulary is strictly limited to the labels provided.",
          "The model is automatically moved to the GPU."
        ],
        correct: 1,
        explanation: "The base representations are kept, but a new, untrained linear layer is added on top to output the specific number of classes you requested."
      },
      {
        question: "What is the primary purpose of the Hugging Face Trainer class?",
        options: [
          "To automatically download datasets.",
          "To write a custom tokenization algorithm.",
          "To abstract away the manual PyTorch/TensorFlow training loop boilerplate.",
          "To convert a model into ONNX format."
        ],
        correct: 2,
        explanation: "The Trainer class handles the repetitive loops, evaluation, mixed precision training, and checkpoint saving."
      },
      {
        question: "Why is a very high learning rate dangerous during fine-tuning?",
        options: [
          "It causes the GPU to overheat.",
          "It requires more disk space.",
          "It can cause 'catastrophic forgetting' by destroying the useful pretrained weights.",
          "It prevents the dataset from being batched."
        ],
        correct: 2,
        explanation: "Fine-tuning requires small, delicate updates. High learning rates cause massive weight changes, overwriting the fundamental language understanding."
      },
      {
        question: "What is a major advantage of using Parameter-Efficient Fine-Tuning (like LoRA)?",
        options: [
          "It significantly reduces the VRAM required because the base model weights are frozen.",
          "It guarantees 100% accuracy on text classification.",
          "It removes the need for tokenization.",
          "It allows you to train without a dataset."
        ],
        correct: 0,
        explanation: "By only training small adapter matrices and freezing the billions of base parameters, LoRA allows fine-tuning massive models on consumer GPUs."
      }
    ],
    colab: {
      title: "Fine-tuning a Pretrained Model",
      objective: [
        "Load a dataset using the Hugging Face Datasets library.",
        "Tokenize the dataset efficiently using map().",
        "Run the Trainer API to fine-tune a model."
      ],
      time: "~30 min",
      link: "https://colab.research.google.com/github/huggingface/notebooks/blob/main/course/en/chapter3/section3.ipynb",
      lookFor: [
        "How the `map` function applies tokenization across the dataset splits.",
        "The use of DataCollatorWithPadding to dynamically pad batches.",
        "The training logs showing loss decreasing over steps."
      ],
      testPrompt: "What role does the DataCollator play in the batching process during training?"
    }
  },
  {
    title: "Diffusion & Generative Art Models",
    concept: {
      explanation: "Generative AI for images is currently dominated by Diffusion models. These models learn by taking clean images, gradually adding random noise until they are unrecognizable, and then training a neural network to reverse that process. By conditioning this reverse process on text embeddings (via a text encoder like CLIP), the model learns to denoise a purely random image into a picture matching your text prompt.",
      underTheHood: [
        "The Forward Process (not used during inference) adds Gaussian noise to an image over multiple steps.",
        "The Reverse Process uses a U-Net neural network to predict the noise added at a specific step, subtracting it iteratively.",
        "A Text Encoder (usually CLIP) converts the prompt into an embedding. The U-Net cross-attends to this embedding during denoising.",
        "The StableDiffusionPipeline encapsulates the U-Net, VAE (for latent space compression), Text Encoder, and Scheduler."
      ],
      codeSnippet: `import torch
from diffusers import StableDiffusionPipeline

# Load the entire diffusion pipeline (U-Net, VAE, Text Encoder, Scheduler)
# We use torch.float16 to drastically reduce GPU memory usage
pipe = StableDiffusionPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5", 
    torch_dtype=torch.float16
)
# Move the pipeline to the GPU
pipe = pipe.to("cuda")

# The text prompt to condition the generation
prompt = "a photorealistic painting of a futuristic city with flying cars"

# Run inference. Under the hood, this loops through the denoising steps.
# The result is an object containing PIL images.
image = pipe(prompt).images[0]

# Save the generated image
image.save("generated_city.png")`,
      glossary: [
        { term: "Diffusion Process", definition: "A framework that learns to generate data by gradually removing noise from a signal." },
        { term: "U-Net", definition: "A convolutional neural network architecture used to predict and subtract noise at each step." },
        { term: "Scheduler", definition: "An algorithm that defines how much noise is added/removed at each step of the diffusion process." },
        { term: "Latent Space", definition: "A compressed representation of an image where the diffusion process actually occurs, saving immense computational power." }
      ],
      mistakes: [
        "Trying to run diffusion models on a CPU (it will take hours per image).",
        "Not using half-precision (float16) on GPUs with limited VRAM, causing Out-Of-Memory errors."
      ]
    },
    quiz: [
      {
        question: "What is the core training objective of the U-Net in a diffusion model?",
        options: [
          "To classify the image.",
          "To generate the image in a single step.",
          "To predict the noise added to the image at a given step.",
          "To upscale the image resolution."
        ],
        correct: 2,
        explanation: "The U-Net doesn't predict the final image directly; it predicts the noise, which is then mathematically subtracted to denoise the image."
      },
      {
        question: "Under the hood, how does the text prompt influence the image generation?",
        options: [
          "It is rendered as text on the image.",
          "It determines the learning rate.",
          "It is encoded by a text model (like CLIP), and the U-Net attends to this embedding during denoising.",
          "It acts as a random seed for the noise."
        ],
        correct: 2,
        explanation: "The CLIP text encoder creates a vector representation of the prompt. The U-Net uses cross-attention layers to 'look at' this vector while deciding how to remove noise."
      },
      {
        question: "Why do Stable Diffusion models operate in 'Latent Space'?",
        options: [
          "To make the images completely hidden.",
          "Because running the diffusion process on full-resolution pixel space is too computationally expensive.",
          "To ensure the prompt is kept secret.",
          "Because it removes the need for a text encoder."
        ],
        correct: 1,
        explanation: "Stable Diffusion uses a VAE (Variational Autoencoder) to compress images into a smaller latent space, runs the heavy diffusion process there, and then decodes it back to pixels."
      },
      {
        question: "What parameter in the diffusers library is critical for running on consumer GPUs without crashing?",
        options: [
          "num_inference_steps",
          "torch_dtype=torch.float16",
          "prompt_length",
          "scheduler"
        ],
        correct: 1,
        explanation: "Loading the model in half-precision (float16) halves the VRAM requirement, making it possible to run on standard 8GB GPUs."
      }
    ],
    colab: {
      title: "Diffusers Quicktour",
      objective: [
        "Initialize a Stable Diffusion pipeline.",
        "Generate images from text prompts.",
        "Learn about different schedulers."
      ],
      time: "~15 min",
      link: "https://colab.research.google.com/github/huggingface/notebooks/blob/main/diffusers_doc/en/pytorch/quicktour.ipynb",
      lookFor: [
        "The impact of the `num_inference_steps` parameter on generation time and quality.",
        "How changing the scheduler algorithm alters the output.",
        "The code required to generate multiple images simultaneously."
      ],
      testPrompt: "How do you modify the generation call to output a grid of 4 images instead of just 1?"
    }
  }
];
