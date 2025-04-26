import { FormControl } from '@angular/forms';

export interface Video {
    id?: string;
    title: string;
    category: string[];
    description: string;
    hashtag: string[];
    actors: string[];
    views: number;
    country?: string;
    createdAt?: string;
    thumbnail?: string;
    size: number;
    url: string;
}

export type VideoForm = {
    [P in keyof Video]: FormControl<Video[P]>;
};
