export const summaryTemplate = `
You are an expert in summarizing YouTube videos.

Create a Markdown-formatted summary of the podcast below. Also, generate specific questions and answers based on the podcast.

### Transcript:
{text}

### Output:
##Summary:
- [Your summary here]

## Example Questions:
1. **Question:[First question]** 
   **Answer:** [First answer]

2. **Question:[Second question]**   
   **Answer:** [Second answer]
`;