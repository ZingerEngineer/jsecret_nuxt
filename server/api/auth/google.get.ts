function generateGoogleAuthUrl({
  clientId,
  scopes,
  responseType = 'token',
  prompt = 'consent'
}: {
  clientId: string
  scopes: string | string[]
  responseType?: string
  prompt?: string
}) {
  const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth'

  const scopeString = Array.isArray(scopes) ? scopes.join(' ') : scopes

  // Construct query parameters
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: responseType,
    scope: scopeString,
    prompt,
    include_granted_scopes: 'true'
  })

  // Return the full URL
  return `${baseUrl}?${params.toString()}`
}

const fetchGoogleUserProfile = async (token: string, clientId: string) => {
  try {
    const googleApiUri = generateGoogleAuthUrl({
      clientId: clientId,
      scopes: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    })
    console.log(token, clientId)
    const response = await $fetch(googleApiUri, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log('Google user profile:', response)
    return response
  } catch (error) {
    console.error('Error fetching Google user profile:', error)
    return null
  }
}
export default defineEventHandler(async (event) => {
  const headers = getRequestHeaders(event)
  console.log(headers)
  console.log(headers.credential)
  const { credential, clientId } = headers
  if (!credential || !clientId) throw new Error('Missing required headers')
  const userProfile = await fetchGoogleUserProfile(
    credential as string,
    clientId as string
  )
  if (userProfile) {
    return {
      status: 'success',
      data: userProfile
    }
  } else {
    return {
      status: 'error',
      message: 'Failed to fetch user profile'
    }
  }
})
