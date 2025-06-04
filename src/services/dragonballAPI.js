import axios from 'axios'

const BASE_URL = 'https://dragonball-api.com/api'

export class DragonBallAPI {
  static async getCharacters() {
    try {
      const response = await axios.get(`${BASE_URL}/characters`)
      return {
        success: true,
        characters: response.data.items || response.data
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        characters: []
      }
    }
  }

  static async searchCharacters(name) {
    try {
      const allCharacters = await this.getCharacters()
      if (allCharacters.success) {
        const filtered = allCharacters.characters.filter(character =>
          character.name.toLowerCase().includes(name.toLowerCase())
        )
        return {
          success: true,
          characters: filtered
        }
      }
      return allCharacters
    } catch (error) {
      return {
        success: false,
        error: error.message,
        characters: []
      }
    }
  }

  static async getRandomCharacters(count = 6) {
    try {
      const allCharacters = await this.getCharacters()
      if (allCharacters.success) {
        const shuffled = [...allCharacters.characters].sort(() => 0.5 - Math.random())
        return {
          success: true,
          characters: shuffled.slice(0, count)
        }
      }
      return allCharacters
    } catch (error) {
      return {
        success: false,
        error: error.message,
        characters: []
      }
    }
  }
}

export default DragonBallAPI