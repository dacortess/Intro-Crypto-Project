// Helper function to execute Python operations via API
async function executePythonOperation(scriptName: string, data: any): Promise<any> {
  try {
    console.log(`Sending request to ${scriptName}:`, data);
    const response = await fetch(`https://dacortess.pythonanywhere.com/api/python/${scriptName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const result = await response.json();
    console.log(`Response from ${scriptName}:`, result);
    return result;
  } catch (error) {
    console.error(`Error executing Python operation:`, error);
    throw error;
  }
}

interface EncryptionResponse {
  'Encrypted text': string;
  'Key': string;
  'IV': string;
  'a': string;
  'b': string;
  'Signature': string;
  'Public key': string;
  'Private key': string;
}

interface DecryptionResponse {
  'Decrypted text': string;
  'Best coincidence': string;
  'Brutteforce': string[];
  'Validity': string;
  'Signature': string;
}

interface AnalysisResponse {
  'Analysis result': string;
}

export async function encryptText(text: string, method: string, params: Record<string, string>): Promise<string> {
  try {
    // Validate input
    if (!text || !method) {
      throw new Error('Text and method are required');
    }

    // Process parameters
    const processedParams: Record<string, string> = {};
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        // Convert numbers to strings if needed
        processedParams[key] = value.toString();
      }
    }

    // Special handling for key_size in ElGamal
    if (method === 'elgamal' && processedParams.key_size) {
      processedParams.key_size = processedParams.key_size.toString();
    }

    // Special handling for mode in AES/DES
    if ((method === 'aes' || method === 'des') && processedParams.mode) {
      processedParams.mode = processedParams.mode.toUpperCase();
    }

    const requestData = {
      text,
      method,
      params: processedParams
    };

    console.log('Encryption request:', requestData);
    const response = await executePythonOperation('encrypt', requestData) as EncryptionResponse;
    
    // Format the response to show only non-empty values
    const formattedResponse = Object.entries(response)
      .filter(([_, value]) => value !== '')
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');

    return formattedResponse;
  } catch (error) {
    console.error('Encryption error:', error);
    throw error;
  }
}

export async function decryptText(text: string, method: string, params: Record<string, string> = {}): Promise<string> {
  try {
    console.log("Decryption request:", { text, method, params });
    const processedParams: Record<string, string> = {};
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        processedParams[key] = value.toString();
      }
    }

    const requestData = {
      text,
      method,
      params: processedParams
    };

    const response = await executePythonOperation('decrypt', requestData) as DecryptionResponse;
    
    // Build formatted response
    const lines: string[] = [];

    // Add non-empty string fields
    if (response['Decrypted text']) lines.push(`Decrypted text: ${response['Decrypted text']}`);
    if (response['Best coincidence']) lines.push(`Best coincidence: ${response['Best coincidence']}`);
    if (response['Validity']) lines.push(`Validity: ${response['Validity']}`);
    if (response['Signature']) lines.push(`Signature: ${response['Signature']}`);

    // Add bruteforce results if array is not empty
    if (Array.isArray(response['Brutteforce']) && response['Brutteforce'].length > 0) {
      lines.push('Bruteforce results:');
      response['Brutteforce'].forEach((result, index) => {
        lines.push(`  ${index + 1}. ${result}`);
      });
    }

    return lines.join('\n');
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
    const response = await executePythonOperation('analyze', {
      text,
      method
    }) as AnalysisResponse;
    
    // Format the response to show only non-empty values
    const formattedResponse = Object.entries(response)
      .filter(([_, value]) => value !== '')
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');

    return formattedResponse;
  } catch (error) {
    console.error('Analysis error:', error);
    if (error instanceof Error) {
      return `Error during analysis: ${error.message}`;
    }
    return 'Error during analysis';
  }
}