import { ChangeDetectorRef, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { VideoService } from '../services/videos.service';
import { Card } from 'primeng/card';
import { FileSelectEvent, FileUpload, FileUploadEvent } from 'primeng/fileupload';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Button, ButtonDirective } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { Video, VideoForm } from '../models/video.model';
import { DatePipe } from '@angular/common';
import { FloatLabel } from 'primeng/floatlabel';
import { Select } from 'primeng/select';
import { ACTORS, CATEGORY, COUNTRIES, HASHTAGS } from '../../../../share/share.constant';
import { Drawer } from 'primeng/drawer';
import { StyleClass } from 'primeng/styleclass';
import { MultiSelect } from 'primeng/multiselect';
import { Textarea } from 'primeng/textarea';
import { ConvertToMbPipe } from '../../../../pipes/convert-to-mb.pipe';
import { finalize, Observable, switchMap, tap } from 'rxjs';

@Component({
    selector: 'app-video-management',
    imports: [Card, FileUpload, FormsModule, InputText, Button, DropdownModule, TableModule, ButtonDirective, DatePipe, FloatLabel, ReactiveFormsModule, Select, Drawer, StyleClass, MultiSelect, Textarea, ConvertToMbPipe],
    templateUrl: './video-management.component.html',
    standalone: true,
    styleUrl: './video-management.component.scss'
})
export class VideoManagementComponent implements OnInit {
    readonly fb = inject(NonNullableFormBuilder);
    readonly COUNTRIES = COUNTRIES;
    readonly HASHTAGS = HASHTAGS;
    readonly ACTORS = ACTORS;
    readonly CATEGORY = CATEGORY;
    readonly cdr = inject(ChangeDetectorRef);
    videoTitle = '';
    videoService = inject(VideoService);
    searchText = '';
    selectedFormat: any;
    videos: WritableSignal<Video[]> = signal<Video[]>([]);
    videoUrl: WritableSignal<string[]> = signal<string[]>([]);
    videoPath: WritableSignal<string> = signal<string>('');
    fileUpload: File = new File([], '');
    visible = false;
    uploadVideoForm: FormGroup<VideoForm> = this.fb.group<VideoForm>({
        actors: this.fb.control([]),
        category: this.fb.control([]),
        country: this.fb.control(undefined),
        createdAt: this.fb.control(undefined),
        description: this.fb.control(''),
        hashtag: this.fb.control([]),
        id: this.fb.control(''),
        thumbnail: this.fb.control(undefined),
        title: this.fb.control(''),
        views: this.fb.control(0),
        size: this.fb.control(0),
        url: this.fb.control('')
    });
    protected readonly open = open;

    ngOnInit(): void {
        this.getAllVideo().subscribe();
    }

    getAllVideo(): Observable<Video[]> {
        return this.videoService.getVideo().pipe(
            tap({
                next: (res) => {
                    const url: string[] = res.filter((item) => item.url).map((item) => item.url);
                    this.videoUrl.set(url);
                    this.videos.set(res);
                }
            })
        );
    }

    onUpload($event: FileUploadEvent) {
        console.log($event);
    }

    uploadVideo() {}

    viewVideo(video: Video) {
        window.open(video.url, '_blank');
    }

    deleteVideo(video: any) {}

    selectFile($event: FileSelectEvent) {
        console.log($event);
        this.fileUpload = $event.currentFiles[0];
        this.videoPath.set($event.currentFiles[0].name);
    }

    openUpLoad() {
        this.visible = true;
    }

    submitUpload() {
        this.videoService
            .uploadVideo(this.uploadVideoForm.value as Video, this.fileUpload)
            .pipe(
                switchMap(() => this.getAllVideo()),
                finalize(() => this.cdr.detectChanges())
            )
            .subscribe();
    }
}
