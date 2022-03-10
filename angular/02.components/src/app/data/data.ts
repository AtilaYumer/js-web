import { Article } from "../models/article.model";
import { data } from "./seed";

export class ArticleData {
    getData(): Article[] {
        return data.map(d => new Article(d.title, d.description, d.author, d.imageUrl));
    }
}