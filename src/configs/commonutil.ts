// Helper function to check environment variables
export function checkEnvVariables(vars: string[]) {
  vars.forEach((varName) => {
    if (!process.env[varName]) {
      console.error(`${varName} is not set but is required.`)
      throw new Error(`${varName} is not set but is required.`)
    }
  })
}
