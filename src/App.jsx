import React, { useState } from 'react';

// Hardcoded Topic Data from Web Search Grounding
const TOPICS = [
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
      link: "https://colab.research.google.com/github/huggingface/notebooks/blob/master/course/en/chapter2/section4.ipynb",
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
      link: "https://colab.research.google.com/github/huggingface/notebooks/blob/master/course/en/chapter1/section3.ipynb",
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
      link: "https://colab.research.google.com/github/tensorflow/docs/blob/master/site/en/tutorials/text/text_classification_rnn.ipynb",
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
      link: "https://colab.research.google.com/github/huggingface/notebooks/blob/master/course/en/chapter1/section4.ipynb",
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
      link: "https://colab.research.google.com/github/huggingface/notebooks/blob/master/course/en/chapter3/section1.ipynb",
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
      link: "https://colab.research.google.com/github/huggingface/notebooks/blob/main/diffusers_doc/en/quicktour.ipynb",
      lookFor: [
        "The impact of the `num_inference_steps` parameter on generation time and quality.",
        "How changing the scheduler algorithm alters the output.",
        "The code required to generate multiple images simultaneously."
      ],
      testPrompt: "How do you modify the generation call to output a grid of 4 images instead of just 1?"
    }
  }
];

function App() {
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [visitedTopics, setVisitedTopics] = useState(new Set([0]));
  const [completedTopics, setCompletedTopics] = useState(new Set());
  const [activeTab, setActiveTab] = useState('concept'); // concept | quiz | colab
  
  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const currentTopic = TOPICS[activeTopicIndex];

  const handleTopicClick = (index) => {
    setActiveTopicIndex(index);
    setVisitedTopics(prev => new Set(prev).add(index));
    setActiveTab('concept');
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  const handleQuizSubmit = () => {
    let score = 0;
    currentTopic.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) score++;
    });
    setQuizScore(score);
    setQuizSubmitted(true);
    if (score >= 3) {
      setCompletedTopics(prev => new Set(prev).add(activeTopicIndex));
    }
  };

  const isQuizComplete = Object.keys(quizAnswers).length === currentTopic.quiz.length;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex font-sans">
      
      {/* Sidebar */}
      <aside className="w-80 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold text-teal-400">HuggingFace ML Dojo</h1>
          <p className="text-sm text-gray-400 mt-2">Zero to Hero in the HF Ecosystem</p>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {TOPICS.map((topic, index) => {
            const isActive = index === activeTopicIndex;
            const isCompleted = completedTopics.has(index);
            const isVisited = visitedTopics.has(index);
            
            return (
              <button
                key={index}
                onClick={() => handleTopicClick(index)}
                className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors ${
                  isActive ? 'bg-teal-900/30 border border-teal-500/50 text-teal-300' : 
                  isVisited ? 'bg-gray-800/50 hover:bg-gray-800 text-gray-300' : 
                  'hover:bg-gray-800 text-gray-400'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                  isCompleted ? 'bg-teal-500 border-teal-500 text-gray-900' :
                  'border-gray-600'
                }`}>
                  {isCompleted && (
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-sm font-medium leading-snug">{topic.title}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Sticky Top Bar */}
        <header className="bg-gray-900 border-b border-gray-800 p-4 sticky top-0 z-10 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">{currentTopic.title}</h2>
            {completedTopics.has(activeTopicIndex) && (
              <span className="px-3 py-1 bg-teal-500/20 text-teal-400 text-sm font-bold rounded-full flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                Topic Complete
              </span>
            )}
          </div>
          
          <div className="flex gap-1 bg-gray-950 p-1 rounded-lg w-max border border-gray-800">
            <button 
              onClick={() => setActiveTab('concept')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === 'concept' ? 'bg-gray-800 text-teal-400 shadow' : 'text-gray-400 hover:text-gray-200'}`}
            >
              Concept
            </button>
            <button 
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === 'quiz' ? 'bg-gray-800 text-teal-400 shadow' : 'text-gray-400 hover:text-gray-200'}`}
            >
              Quiz
            </button>
            <button 
              onClick={() => setActiveTab('colab')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === 'colab' ? 'bg-gray-800 text-teal-400 shadow' : 'text-gray-400 hover:text-gray-200'}`}
            >
              Colab Task
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto pb-20">
            
            {/* CONCEPT TAB */}
            {activeTab === 'concept' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <section>
                  <p className="text-lg leading-relaxed text-gray-300">
                    {currentTopic.concept.explanation}
                  </p>
                </section>

                <section className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                  <h3 className="text-xl font-bold text-teal-400 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    How it works under the hood
                  </h3>
                  <ul className="space-y-3">
                    {currentTopic.concept.underTheHood.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <span className="text-teal-500 mt-1">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {currentTopic.concept.hasDiagram && (
                  <section className="bg-gray-800 p-6 rounded-xl border border-gray-700 font-mono text-sm">
                    <div className="text-teal-400 mb-6 font-bold">{'// Self-Attention Mechanism'}</div>
                    <div className="flex flex-col gap-4 text-center items-center">
                      <div className="flex gap-4">
                        <div className="bg-blue-900/50 border border-blue-500 px-6 py-3 rounded-lg">
                          <div className="font-bold text-blue-300 text-lg">Query (Q)</div>
                          <div className="text-xs text-blue-200 mt-1">"What am I looking for?"</div>
                        </div>
                        <div className="bg-purple-900/50 border border-purple-500 px-6 py-3 rounded-lg">
                          <div className="font-bold text-purple-300 text-lg">Key (K)</div>
                          <div className="text-xs text-purple-200 mt-1">"What do I contain?"</div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-center text-gray-400">
                        <span>↓ Matrix Multiply & Softmax ↓</span>
                      </div>
                      
                      <div className="bg-teal-900/30 px-6 py-3 rounded-lg w-72 border border-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.2)]">
                        <div className="font-bold text-teal-400 text-lg">Attention Weights</div>
                        <div className="text-xs text-teal-200 mt-1">Score of relevance between tokens</div>
                      </div>
                      
                      <div className="flex flex-col items-center text-gray-400">
                        <span>↓ Multiply by ↓</span>
                      </div>
                      
                      <div className="bg-pink-900/50 border border-pink-500 px-6 py-3 rounded-lg w-72">
                        <div className="font-bold text-pink-300 text-lg">Value (V)</div>
                        <div className="text-xs text-pink-200 mt-1">"The actual token content"</div>
                      </div>
                      
                      <div className="flex flex-col items-center text-gray-400">
                        <span>↓ Output ↓</span>
                      </div>
                      
                      <div className="bg-green-900/50 border border-green-500 text-green-300 px-6 py-3 rounded-lg font-bold w-72">
                        Contextualized Embedding
                      </div>
                    </div>
                  </section>
                )}

                <section>
                  <h3 className="text-lg font-bold text-gray-200 mb-3">Code Example</h3>
                  <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                    <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    </div>
                    <pre className="p-4 overflow-x-auto text-sm text-gray-300 font-mono">
                      <code>{currentTopic.concept.codeSnippet}</code>
                    </pre>
                  </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <section className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <h3 className="text-lg font-bold text-gray-200 mb-4">Key Terms</h3>
                    <dl className="space-y-4">
                      {currentTopic.concept.glossary.map((item, i) => (
                        <div key={i}>
                          <dt className="font-bold text-teal-400">{item.term}</dt>
                          <dd className="text-sm text-gray-400 mt-1">{item.definition}</dd>
                        </div>
                      ))}
                    </dl>
                  </section>

                  <section className="bg-red-950/20 p-6 rounded-xl border border-red-900/50">
                    <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Common Mistakes
                    </h3>
                    <ul className="space-y-3">
                      {currentTopic.concept.mistakes.map((mistake, i) => (
                        <li key={i} className="flex items-start gap-3 text-red-200/80 text-sm">
                          <span className="text-red-500 mt-0.5">•</span>
                          <span>{mistake}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              </div>
            )}

            {/* QUIZ TAB */}
            {activeTab === 'quiz' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                {quizSubmitted ? (
                  <div className={`p-6 rounded-xl border ${quizScore >= 3 ? 'bg-teal-900/20 border-teal-500/50' : 'bg-red-900/20 border-red-500/50'} text-center`}>
                    <h3 className="text-2xl font-bold mb-2">
                      {quizScore >= 3 ? 'Topic Complete! ✅' : 'Keep Trying!'}
                    </h3>
                    <p className="text-gray-300 mb-6">
                      You scored {quizScore} out of {currentTopic.quiz.length}
                    </p>
                    {quizScore < 3 && (
                      <button 
                        onClick={() => { setQuizSubmitted(false); setQuizAnswers({}); }}
                        className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg font-bold text-white transition-colors"
                      >
                        Review and Retry
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <p className="text-gray-400 mb-6">Pass with 3/4 correct to complete this topic.</p>
                    <div className="space-y-10">
                      {currentTopic.quiz.map((q, qIdx) => (
                        <div key={qIdx} className="space-y-4">
                          <h4 className="font-bold text-lg text-gray-200">
                            <span className="text-teal-500 mr-2">{qIdx + 1}.</span> 
                            {q.question}
                          </h4>
                          <div className="space-y-2">
                            {q.options.map((opt, oIdx) => (
                              <label key={oIdx} className={`flex items-start p-4 rounded-lg border cursor-pointer transition-colors ${quizAnswers[qIdx] === oIdx ? 'bg-teal-900/20 border-teal-500' : 'bg-gray-950 border-gray-800 hover:border-gray-600'}`}>
                                <input 
                                  type="radio" 
                                  name={`q-${qIdx}`}
                                  value={oIdx}
                                  checked={quizAnswers[qIdx] === oIdx}
                                  onChange={() => setQuizAnswers(prev => ({ ...prev, [qIdx]: oIdx }))}
                                  className="mt-1 shrink-0 accent-teal-500 w-4 h-4"
                                />
                                <span className="ml-3 text-gray-300">{opt}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-800 flex justify-end">
                      <button 
                        disabled={!isQuizComplete}
                        onClick={handleQuizSubmit}
                        className={`px-8 py-3 rounded-lg font-bold transition-all ${isQuizComplete ? 'bg-teal-600 hover:bg-teal-500 text-white' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                      >
                        Submit Answers
                      </button>
                    </div>
                  </div>
                )}

                {/* Show explanations after submission */}
                {quizSubmitted && (
                  <div className="space-y-6 mt-8">
                    <h3 className="text-xl font-bold text-gray-200 border-b border-gray-800 pb-2">Review Your Answers</h3>
                    {currentTopic.quiz.map((q, qIdx) => {
                      const isCorrect = quizAnswers[qIdx] === q.correct;
                      return (
                        <div key={qIdx} className={`p-4 rounded-lg border ${isCorrect ? 'bg-green-900/10 border-green-900/50' : 'bg-red-900/10 border-red-900/50'}`}>
                          <div className="flex gap-3">
                            <div className="mt-1">
                              {isCorrect ? (
                                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                              ) : (
                                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                              )}
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-300 mb-1">{q.question}</h4>
                              <p className="text-sm text-gray-400 mb-2">
                                <span className="font-semibold text-gray-300">Your answer:</span> {q.options[quizAnswers[qIdx]]}
                              </p>
                              {!isCorrect && (
                                <p className="text-sm text-gray-400 mb-2">
                                  <span className="font-semibold text-green-400">Correct answer:</span> {q.options[q.correct]}
                                </p>
                              )}
                              <p className={`text-sm ${isCorrect ? 'text-green-300/80' : 'text-red-300/80'} mt-2 p-2 bg-gray-950/50 rounded`}>
                                {q.explanation}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {/* COLAB TAB */}
            {activeTab === 'colab' && (
              <div className="animate-in fade-in duration-300 max-w-2xl mx-auto">
                <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl">
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-bold text-white">{currentTopic.colab.title}</h3>
                      <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {currentTopic.colab.time}
                      </span>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-teal-400 font-bold mb-3 uppercase tracking-wider text-xs">Objective</h4>
                      <ul className="space-y-2">
                        {currentTopic.colab.objective.map((obj, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-300">
                            <svg className="w-5 h-5 text-teal-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {obj}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-8 p-4 bg-yellow-900/20 border border-yellow-700/50 rounded-lg">
                      <h4 className="text-yellow-400 font-bold mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        What to look for
                      </h4>
                      <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm pl-2">
                        {currentTopic.colab.lookFor.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <a 
                      href={currentTopic.colab.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full py-4 px-6 bg-[#F9AB00] hover:bg-[#F9AB00]/90 text-gray-900 font-bold text-center rounded-lg transition-colors flex justify-center items-center gap-2 shadow-lg"
                    >
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.8 11.23a4.23 4.23 0 0 0-4.05-3.05 4.3 4.3 0 0 0-4.3 4.3 4.3 4.3 0 0 0 4.3 4.3 4.23 4.23 0 0 0 4.05-3.05h3A7.26 7.26 0 0 1 8.75 19.82a7.3 7.3 0 0 1-7.3-7.3 7.3 7.3 0 0 1 7.3-7.3 7.26 7.26 0 0 1 7.05 6.09h-3zM22.55 12.48a7.26 7.26 0 0 1-7.05 6.09h3a4.23 4.23 0 0 0 4.05-3.05 4.3 4.3 0 0 0-4.3-4.3 4.3 4.3 0 0 0-4.3 4.3 4.23 4.23 0 0 0-4.05-3.05h-3a7.26 7.26 0 0 1 7.05-6.09 7.3 7.3 0 0 1 7.3 7.3 7.3 7.3 0 0 1-7.3 7.3z"/>
                      </svg>
                      Open in Google Colab
                    </a>
                  </div>
                  
                  <div className="bg-teal-900/20 p-6 border-t border-gray-800">
                    <h4 className="text-teal-400 font-bold mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Done? Test yourself
                    </h4>
                    <p className="text-gray-300 italic text-sm">
                      {currentTopic.colab.testPrompt}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

