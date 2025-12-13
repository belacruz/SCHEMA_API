export async function fetchData<T>(url: string): Promise<T[] | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erro de fetch: ${response.status}`);
    const json = await response.json();
    return json;
  } catch (error) {
    if (error instanceof Error) console.error(`fetchData retornou um erro: ${error.message} `);
    return null;
  }
}
