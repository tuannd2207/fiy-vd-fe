import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Video } from '../models/video.model';

@Injectable({ providedIn: 'root' })
export class VideoService {
    constructor(private http: HttpClient) {}

    getVideo(): Observable<Video[]> {
        return this.http.get<Video[]>(environment.fiyUrl + '/videos');
    }

    uploadVideo(videos: Video, file: File): Observable<any> {
        console.log(videos);
        const formData = new FormData();
        formData.append('file', file);
        Object.entries(videos).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                formData.append(key, JSON.stringify(value));
            } else if (value !== null && value !== undefined) {
                formData.append(key, value);
            } else {
                formData.append(key, '');
            }
        });
        return this.http.post('http://localhost:3000/videos/upload', formData);
    }
}
