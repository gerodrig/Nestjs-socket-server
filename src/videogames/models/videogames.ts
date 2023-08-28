import { Videogame } from './videogame';

export class Videogames {
  videogames: Videogame[];
  constructor() {
    this.videogames = [];
  }

  addVideogame(videogame: Videogame) {
    this.videogames.push(videogame);
  }

  getVideogames() {
    return this.videogames;
  }

  deleteVideogame(id = '') {
    this.videogames = this.videogames.filter(
      (videogame) => videogame.id !== id,
    );
  }

  voteVideogame(id = '') {
    this.videogames = this.videogames.map((videogame) => {
      if (videogame.id === id) {
        videogame.votes++;
      }
      return videogame;
    });
  }
}
