// Helper function to execute Python operations via API
async function executePythonOperation(scriptName: string, data: any): Promise<string> {
  try {
    const response = await fetch(`https://dacortess.pythonanywhere.com/api/python/${scriptName}`, {
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
    console.log("Encryption request:", {
      text,
      method,
      params
    });
    const result = await executePythonOperation('encrypt', {
      text,
      method,
      params
    });
    console.log("Encryption response:", result);
    return result;
  } catch (error) {
    console.error('Encryption error:', error);
    if (error instanceof Error) {
      return `Error during encryption: ${error.message}`;
    }
    return 'Error during encryption';
  }
}

export async function decryptText(text: string, method: string, params: Record<string, string> = {}): Promise<string> {
  try {
    console.log("Decryption request:", { text, method, params });
    const result = await executePythonOperation('decrypt', {
      text,
      method,
      params
    });
    console.log("Decryption response:", result);
    return result;
  } catch (error) {
    console.error('Decryption error:', error);
    if (error instanceof Error) {
      return `Error during decryption: ${error.message}`;
    }
    return 'Error during decryption';
  }
}

export async function analyzeText(text: string, method: string): Promise<string> {
  try {
    console.log("Analysis request:", { text, method });
    const result = await executePythonOperation('analyze', {
      text,
      method
    });
    console.log("Analysis response:", result);
    return result;
  } catch (error) {
    console.error('Analysis error:', error);
    if (error instanceof Error) {
      return `Error during analysis: ${error.message}`;
    }
    return 'Error during analysis';
  }
}