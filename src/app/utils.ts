export const parseTimeStamp = (time: number) => {
    let date = new Date(time * 1000)
    let options = { timeZone: 'UTC' }; 
    return date.toLocaleDateString('en-US', options)
  }