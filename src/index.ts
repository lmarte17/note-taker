import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "LectureNotesGenerator",
  version: "1.0.0"
});

// Define the prompt for generating lecture notes
server.prompt(
  "generate-lecture-notes",
  {
    courseName: z.string().describe("The name of the course"),
    lectureNumber: z.string().describe("The lecture number"),
    lectureTopic: z.string().describe("The topic of the lecture"),
    transcriptFilePath: z.string().describe("The file path to the lecture transcript"),
    outputDirectory: z.string().describe("The directory where notes should be saved"),
    outputFilename: z.string().describe("The filename for the output notes"),
    specialFormatting: z.string().optional().describe("Any special formatting requirements"),
    contentToEmphasize: z.string().optional().describe("Any specific content that should be emphasized"),
    otherInstructions: z.string().optional().describe("Any other instructions for note generation")
  },
  ({
    courseName,
    lectureNumber,
    lectureTopic,
    transcriptFilePath,
    outputDirectory,
    outputFilename,
    specialFormatting,
    contentToEmphasize,
    otherInstructions
  }) => {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Please create detailed Markdown notes for my course on ${courseName}. 
Source information:
- Lecture: ${lectureNumber}
- Topic: ${lectureTopic}
- Transcript file: ${transcriptFilePath}
- Output location: ${outputDirectory}/${outputFilename}.md
Additional requests:
- ${specialFormatting || ""}
- ${contentToEmphasize || ""}
- ${otherInstructions || ""}
Please follow these guidelines when creating the notes:
- Remember, You have access to these files: ${transcriptFilePath}
- First, read the lecture transcript from the file at ${transcriptFilePath}
- Organize content with clear headings and subheadings
- Use proper Markdown formatting (including mathematical notation where needed)
- Include all key concepts, definitions, and examples
- Structure the notes in a logical flow that follows the lecture
- Highlight important formulas, algorithms, or theoretical frameworks
- Save the completed notes to ${outputDirectory}/${outputFilename}.md`
          }
        }
      ]
    };
  }
);

// Start server
async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Lecture Notes Generator MCP Server running");
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

main();