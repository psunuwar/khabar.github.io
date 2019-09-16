import { setLoading, setState } from '../state'

const sources = [
  ['hackernews', 'hackerNews'],
  ['github', 'github'],
  ['echojs', 'echojs'],
  ['devto', 'devto'],
  ['medium', 'medium'],
  ['reddit', 'reddit'],
  ['growthhackers', 'growthHackers'],
  ['datatau', 'datatau'],
  ['redditprogramming', 'redditprogramming'],
  ['producthunt', 'productHunt'],
]

const baseURL =
  'https://cors-anywhere.herokuapp.com/cdnapi.pnd.gs/v2/feeds?limit=20&page=1&sort=popular&sources='
const options = { headers: { Origin: 'https://khabar.github.io/' } }

const fetchAndSave = async (key: string, source: string) => {
  const data = (await (await fetch(baseURL + source, options)).json()).filter(
    (x: any) => x.source.likesCount === undefined || x.source.likesCount,
  )

  await setState(key, data)
}

const fetchData = async (sourceKey?: string) => {
  try {
    const now = Date.now()
    const then = +(window.localStorage.getItem('fetchedAt') || 0)

    if (sourceKey) {
      const source = sources.find(([k]) => k === sourceKey)
      if (source) await fetchAndSave(sourceKey, source[1])
    } else if (now - then > 60 * 60 * 1000) {
      window.localStorage.setItem('fetchedAt', '' + now)
      setLoading(true)
      for (let [key, source] of sources) {
        await fetchAndSave(key, source)
      }
    }
  } catch (error) {
    console.error(error)
  } finally {
    setLoading(false)
  }
}

export default fetchData
