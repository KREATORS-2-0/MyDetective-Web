 // Load API key from environment variable

async function getCompletion(
  prompt,
  messages,
  model = "gpt-4",
  temperature = 0
) {
  messages.push({ role: "user", content: prompt });

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: temperature,
      }),
    });

    const data = await response.json();

    messages.push({
      role: "assistant",
      content: data.choices[0].message.content,
    });

    return data.choices[0].message.content;
  } catch (e) {
    return `An error occurred: ${e}`;
  }
}

export default getCompletion;

// Example usage
// (async () => {
//   let conversationHistory = [];
//  //Detective Prompt
//   const prompt1 = `The suspect name is ${name} born at ${date}. The suspect is a ${relationship} 
//   to the victim. The cases summarizes that ${caseSummary}. The evidence that supports the crime is ${caseEvidence}.
//   the suspect has criminal records of ${crimeRecords}. Provide me some guide questions to ask in 1 sentence for continuing interrogation`

//   let response = await getCompletion(prompt1, conversationHistory);
//   console.log(response);
//   // Gets data
//   const prompt2 = "Do you know my name?";
//   response = await getCompletion(prompt2, conversationHistory);
//   console.log(response);
//   console.log(conversationHistory);
// })();
