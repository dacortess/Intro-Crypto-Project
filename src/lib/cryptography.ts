// Helper function to execute Python operations via API
async function executePythonOperation(scriptName: string, data: any): Promise<string> {
  try {
    const response = await fetch(`/api/python/${scriptName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.text();
    return result;
  } catch (error) {
    console.error(`Error executing Python operation:`, error);
    throw error;
  }
}

export async function encryptText(text: string, method: string, params: Record<string, string>): Promise<string> {
  try {
    const result = await executePythonOperation('encrypt', {
      text,
      method,
      params
    });
    return result;
  } catch (error) {
    console.error('Encryption error:', error);
    return 'Error during encryption';
  }
}

export async function decryptText(text: string, method: string): Promise<string> {
  try {
    const result = await executePythonOperation('decrypt', {
      text,
      method
    });
    return result;
  } catch (error) {
    console.error('Decryption error:', error);
    return 'Error during decryption';
  }
}

export async function analyzeText(text: string, method: string): Promise<string> {
  try {
    const result = await executePythonOperation('analyze', {
      text,
      method
    });
    return result;
  } catch (error) {
    console.error('Analysis error:', error);
    return 'Error during analysis';
  }
}