// // Load API key from environment variable

// // GPT INITIALIZATION

async function initializeGPT(
  name,
  date,
  relationship,
  caseSummary,
  caseEvidence,
  crimeRecords,
  openaiAPIKey,
  conversationHistory,
  model = "gpt-4",
  temperature = 0
) {
  const initial_message = `Hello, I am a detective trying to interrogate a suspect. I will provide the background information related to the crime, and I want you to provide me exactly three questions for me to ask the suspect so that I can interrogate him. The name of the criminal is ${name}, and the crime happened in ${date}. He is the ${relationship} of the victim, and the case summary is as follows: ${caseSummary}. The evidence is as follows: ${caseEvidence}. The criminal record of the suspect is as follows: ${crimeRecords}. Do not return anything else other than the three questions in an array. The suspect must be able to answer the questions in one sentence or with 'yes' or 'no'. In subsequent interactions, I will also provide EEG data, facial expression classification, and speech classification. We trained a machine learning model based on EEG data to determine whether the individual is lying or not, so we will say whether the individual predicted to be lying or not based on EEG data. We also used DeepFace API to classify the emotion of the individual based on the facial expression (happy, sad, neutral, surprise, or fear). We will provide the timestamps and their corresponding emotions. We also used zero-shot-classification using the natural language processing to analyze the transcription of the individual's response and classified the response into the emotions above. Of course, they are not accurate, but they provide good context for you to come up with the next question. Again, simply provide an array of three questions, and do not return anything else in your response.`;

  const messages = [
    {
      role: "system",
      content:
        "Extract three questions based on the background information provided. The questions should be answerable in one sentence or with 'yes' or 'no'.",
    },
    {
      role: "user",
      content: initial_message,
    },
  ];

  conversationHistory.push(...messages);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiAPIKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: temperature,
      }),
    });

    const data = await response.json();

    conversationHistory.push({
      role: "assistant",
      content: data.choices[0].message.content,
    });

    return data.choices[0].message.content;
  } catch (e) {
    return `An error occurred: ${e}`;
  }
}

// // Subsequent GPT interaction

async function getCompletion(
  question,
  answer,
  conversationHistory,
  eegData,
  facialExpressionPrediction,
  transcriptionPrediction,
  openaiAPIKey,
  model = "gpt-4",
  temperature = 0
) {
  // Formatting facialExpressionPrediction for the prompt
  let facialExpressionStr = "Facial expressions over time: ";
  facialExpressionPrediction.TimeStamp.forEach((time, index) => {
    facialExpressionStr += `${time} - ${facialExpressionPrediction.Emotion[index]}, `;
  });

  // Trimming the last comma and space
  facialExpressionStr = facialExpressionStr.slice(0, -2);
  const prompt = `The question chosen was this: ${question}. The answer was this: ${answer}. The EEG data is as follows: ${eegData}. The facial expression emotional classification is as follows: ${facialExpressionStr}. The transcription emotional classification is as follows: ${transcriptionPrediction}. Just like what you did before, do not return anything else other than the next three questions I should ask the suspect based on the suspect's answer in the same array format.`;

  conversationHistory.push({ role: "user", content: prompt });

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiAPIKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: conversationHistory,
        temperature: temperature,
      }),
    });

    const data = await response.json();

    conversationHistory.push({
      role: "assistant",
      content: data.choices[0].message.content,
    });

    return data.choices[0].message.content;
  } catch (e) {
    return `An error occurred: ${e}`;
  }
}

export { initializeGPT, getCompletion };

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
