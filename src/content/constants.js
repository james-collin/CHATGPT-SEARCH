const API_MAPPING = {
  'https://chat.openai.com': 'https://chat.openai.com/backend-api',
  'https://chat.zhile.io': 'https://proxy1.fakegpt.org/api',
}

// export const baseUrl = 'https://chat.openai.com'
export const baseUrl = new URL(location.href).origin
export const apiUrl = API_MAPPING[baseUrl]