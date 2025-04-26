import { SelectOption } from './model/share.model';
import { Actors, Category, HashTag } from './share.enum';

export const COUNTRIES: SelectOption[] = [
    {
        label: 'Việt Nam',
        value: 'VN'
    },
    {
        label: 'Hàn Quốc',
        value: 'KR'
    }
];

export const HASHTAGS: SelectOption[] = [
    {
        label: 'Love',
        value: HashTag.love
    },
    {
        label: 'Action',
        value: HashTag.action
    }
];
export const ACTORS: SelectOption[] = [
    {
        label: 'Hasha gi',
        value: Actors.hashagi
    },
    {
        label: 'kagawa',
        value: Actors.kagawa
    }
];
export const CATEGORY: SelectOption[] = [
    {
        label: 'Love',
        value: Category.love
    },
    {
        label: 'Action',
        value: Category.action
    },
    {
        label: 'Ancient',
        value: Category.old
    }
];
