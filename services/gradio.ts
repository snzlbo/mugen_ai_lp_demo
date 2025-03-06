import { Client } from '@gradio/client';

const TOKEN = process.env.GRADIO_TOKEN;

export async function getGradioClient() {
  return await Client.connect(process.env.DEV_REPOSITORY || '', {
    hf_token: TOKEN?.startsWith('hf_') ? (TOKEN as `hf_${string}`) : 'hf_',
  });
}

export async function getCheckUrl(urls: string) {
  const client = await getGradioClient();
  const result = await client.predict('/check_url', {
    url_text: urls,
    own_image: null,
  });
  return result.data;
}
