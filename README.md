# Lecture Notes Generator

A Model Context Protocol (MCP) server that automatically generates detailed lecture notes from transcripts using Claude AI.

## Overview

Lecture Notes Generator transforms raw lecture transcripts into well-structured, formatted Markdown notes. It handles reading the transcript file and saving the generated notes to your specified location.

**Important Note:** This project provides only the MCP prompt server that initiates the note-taking process. To handle actual file operations (reading transcripts and saving notes), you must also install the [Filesystem MCP Server](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem) on your client.

## How It Works

This tool uses two complementary MCP servers:
1. **This server (Lecture Notes Generator)**: Creates the specialized prompt for Claude to generate notes
2. **Filesystem MCP Server**: Handles file operations (reading the transcript and saving the generated notes)

The process flow:
1. You provide lecture details including transcript location
2. This server generates instructions for Claude
3. Claude uses the Filesystem MCP Server to read the transcript
4. Claude processes the content and generates notes
5. Claude saves the notes via the Filesystem MCP Server

## Features

- Processes lecture transcripts into organized notes
- Generates clear headings and subheadings
- Uses proper Markdown formatting with mathematical notation support
- Extracts key concepts, definitions, and examples
- Structures notes in a logical flow following the lecture
- Highlights important formulas, algorithms, and theoretical frameworks
- Supports customization through special formatting requests

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/lecture-notes-generator.git
cd lecture-notes-generator

# Install dependencies
npm install

# Build the project
npm run build
```

## Requirements

- Node.js (v16+)
- CLaude Desktop Client (or any other client that utilized MCP server tools and prompts)
- MCP SDK (`@modelcontextprotocol/sdk`)
- [Filesystem MCP Server](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem) for file operations

### Input Parameters

The generator accepts the following parameters:

| Parameter | Description | Required |
|-----------|-------------|----------|
| courseName | Name of the course | Yes |
| lectureNumber | Lecture number | Yes |
| lectureTopic | Topic of the lecture | Yes |
| transcriptFilePath | File path to the lecture transcript | Yes |
| outputDirectory | Directory where notes should be saved | Yes |
| outputFilename | Filename for the output notes | Yes |
| specialFormatting | Any special formatting requirements | No |
| contentToEmphasize | Specific content that should be emphasized | No |
| otherInstructions | Other instructions for note generation | No |

### Example Request

```typescript
const request = {
  courseName: "Introduction to Computer Science",
  lectureNumber: "3",
  lectureTopic: "Data Structures",
  transcriptFilePath: "/path/to/lecture3.txt",
  outputDirectory: "/path/to/output",
  outputFilename: "lecture3-notes.md",
};
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
