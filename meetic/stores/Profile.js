// stores/Profile.js
import {makeAutoObservable, runInAction} from 'mobx';
import { Service } from '../services';
class Profile {
    online = [];
    featured = [];
    constructor() {
        makeAutoObservable(this);
        this.fetchData();
    }
    drop = profile => {
        const onlined = this.online.filter(item => item.id !== profile.id);
        const featured = this.featured.filter(item => item.id !== profile.id);
        runInAction(() => {
            this.online = onlined;
            this.featured = featured;
        });
    }
    }
    fetchData = async () => {
        const featured = await Service.featured();
        const online = await Service.online();
        runInAction(() => {
            this.featured = featured.data;
            this.online = online.data;
        });
    }

export default new Profile();