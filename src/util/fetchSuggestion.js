import conf from "../../conf/conf";
export default async function fetchSuggestion(inputText) {
  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/openai-community/gpt2',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${conf.huggingFace}`
        },
        body: JSON.stringify({ inputs: inputText, parameters: { max_length: 30 } })
      }
    );

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    const newSuggestion = data[0].generated_text.split(inputText)[1] || '';
    return newSuggestion.split(' ')[0];
  } catch (error) {
    console.error('Error fetching suggestion:', error);
    return '';
  }
}