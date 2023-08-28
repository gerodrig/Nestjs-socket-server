import { IsString, IsInt, Min } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class Videogame {
  id: string;

  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  votes: number;

  constructor(name = 'no-name') {
    this.id = uuidv4();
    this.name = name;
    this.votes = 0;
  }
}
