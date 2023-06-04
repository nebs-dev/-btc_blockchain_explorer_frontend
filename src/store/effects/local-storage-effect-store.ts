export const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: { setSelf: (newValue: any) => void; onSet: any }) => {
    const savedValue = localStorage.getItem(key)

    if (key === 'authToken') {
      if (savedValue !== null) {
        setSelf(savedValue)
      }
    } else {
      if (savedValue !== null) {
        setSelf(JSON.parse(savedValue))
      }
    }

    onSet((newValue: any) => {
      if (key === 'authToken') {
        if (newValue !== null) {
          localStorage.setItem(key, newValue)
        }
      } else {
        localStorage.setItem(key, JSON.stringify(newValue))
      }
      return newValue
    })
  }
