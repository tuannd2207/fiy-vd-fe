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

    uploadVideo(videos: Video, file: File) {
        const formData = new FormData();
        formData.append('file', file);
        Object.entries(videos).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((item) => {
                    formData.append(key, JSON.stringify(item));
                });
            } else if (value !== null && value !== undefined) {
                formData.append(key, value);
            } else {
                formData.append(key, '');
            }
        });
        // // Kiểm tra formData kết quả
        // for (const pair of formData.entries()) {
        //     console.log(pair[0], pair[1]);
        // }
        // return;
        this.http.post('http://localhost:3000/videos/upload', formData).subscribe((res) => console.log(res));
    }
}
