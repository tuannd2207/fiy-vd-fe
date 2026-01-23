import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { VideoManagementComponent } from './video-management.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { VideoService } from '../services/videos.service';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

describe('VideoManagementComponent', () => {
    let component: VideoManagementComponent;
    let fixture: ComponentFixture<VideoManagementComponent>;
    let videoService: VideoService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [VideoManagementComponent, ReactiveFormsModule],
            providers: [
                provideHttpClient(), // Provide HttpClient
                provideHttpClientTesting(), // Provide HTTP testing utilities
                VideoService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA] // tránh lỗi nếu không mock đầy đủ PrimeNG components
        }).compileComponents();

        fixture = TestBed.createComponent(VideoManagementComponent);
        component = fixture.componentInstance;
        videoService = TestBed.inject(VideoService);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should init and call getAllVideo()', fakeAsync(() => {
        const getVideoSpy = jest.spyOn(videoService, 'getVideo').mockReturnValue(of([]));

        component.ngOnInit();
        tick();

        expect(getVideoSpy).toHaveBeenCalled();
    }));

    it('should set video url and videos on getAllVideo()', fakeAsync(() => {
        const mockVideos = [{ url: 'http://example.com/video.mp4' }, { url: 'http://example.com/video2.mp4' }];

        jest.spyOn(videoService, 'getVideo').mockReturnValue(of(mockVideos as any));

        component.getAllVideo().subscribe((res) => {
            expect(res).toEqual(mockVideos);
            expect(component.videoUrl()).toEqual(['http://example.com/video.mp4', 'http://example.com/video2.mp4']);
            expect(component.videos()).toEqual(mockVideos);
        });
        tick();
    }));

    it('should open upload dialog', () => {
        component.openUpLoad();
        expect(component.visible).toBe(true);
    });

    it('should set selected file on selectFile()', () => {
        const mockEvent = {
            currentFiles: [new File([''], 'video.mp4')]
        } as any;

        component.selectFile(mockEvent);
        expect(component.fileUpload.name).toBe('video.mp4');
        expect(component.videoPath()).toBe('video.mp4');
    });

    it('should set thumbnail file on selectThumbnailFile()', () => {
        const mockEvent = {
            currentFiles: [new File([''], 'thumbnail.jpg')]
        } as any;

        component.selectThumbnailFile(mockEvent);
        expect(component.imgUpload.name).toBe('thumbnail.jpg');
        expect(component.imagePath()).toBe('thumbnail.jpg');
    });

    it('should submit upload and reload videos', fakeAsync(() => {
        const uploadSpy = jest.spyOn(videoService, 'uploadVideo').mockReturnValue(of({} as any));
        const getVideoSpy = jest.spyOn(videoService, 'getVideo').mockReturnValue(of([]));

        component.submitUpload();
        tick();

        expect(uploadSpy).toHaveBeenCalled();
        expect(getVideoSpy).toHaveBeenCalled();
    }));

    it('should open video in new tab', () => {
        const video = { url: 'http://example.com/video.mp4' } as any;
        const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);

        component.viewVideo(video);
        expect(openSpy).toHaveBeenCalledWith('http://example.com/video.mp4', '_blank');
    });
});
