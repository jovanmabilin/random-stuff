<template>
    <div>
        <div v-for="(item,index) in appNav" :key="index">
            <template v-if="item.ChildItems.length">
                <h5 class="cursor-pointer" @click="changeVisibility(item),clickHandler(item,$event)">{{item.Name}} + <b-badge v-if="item.BadgeCount" variant="danger">{{item.BadgeCount}}</b-badge></h5>
                <template v-if="item.Visible">
                    <div v-for="(childItem1,index) in item.ChildItems" :key="index" class="pl-3">
                        <template v-if="childItem1.ChildItems.length">
                            <h6 class="cursor-pointer" @click="changeVisibility(childItem1),clickHandler(childItem1,$event)">{{childItem1.Name}} + <b-badge v-if="childItem1.BadgeCount" variant="danger">{{childItem1.BadgeCount}}</b-badge></h6>
                            <template v-if="childItem1.Visible">
                                <div v-for="(childItem2,index) in childItem1.ChildItems" :key="index" class="pl-3">
                                    {{ childItem2.Name }} <b-badge v-if="childItem2.BadgeCount" variant="danger">{{childItem2.BadgeCount}}</b-badge>
                                </div>                                
                            </template>
                        </template>
                        <template v-else>
                            {{ childItem1.Name }} <b-badge v-if="childItem1.BadgeCount" variant="danger">{{childItem1.BadgeCount}}</b-badge>
                        </template>
                    </div>
                </template>
            </template>
            <template v-else>
                {{ item.Name }} <b-badge v-if="item.BadgeCount" variant="danger">{{item.BadgeCount}}</b-badge>
            </template>
        </div>
    </div>
</template>

<script>
    import { eventBus } from '../main';
    import forEach from 'lodash/forEach';
    export default {
        data() {
            return {
                appNav: [
                    {
                        Id:4,
                        Name:"Customer",
                        Description:"Customer",
                        Visible: false,
                        BadgeCount: 0,
                        ChildItems:[
                            {
                                Id:3,
                                Name:"Customer List",
                                Description:"Customer List",
                                ChildItems:[],
                                ExternalUrl:"/crm/customer/list",
                                IsExternalUrl:false,
                                IsExternalIFrame:false,
                                IconImageStyle:"fa fa-users",
                                HasBadge:true,
                                DisplayIndex:1,
                                BadgeCount: 0,
                                Visible: false,
                            },
                            {
                                Visible: false,
                                Id:655,
                                Name:"Unanswered Email",
                                Description:"Unanswered Emaiil",
                                ChildItems:[],
                                ExternalUrl:"/crm/customer/unansweredemail",
                                IsExternalUrl:false,
                                IsExternalIFrame:false,
                                IconImageStyle:"fa fa-envelope",
                                HasBadge:true,
                                BadgeCount: 0,
                                DisplayIndex:2
                            },
                            {
                                Visible: false,
                                Id:5,
                                Name:"Incoming Call",
                                Description:"Incoming Call",
                                ChildItems:[],
                                ExternalUrl:"/crm/customer/incomingcall",
                                IsExternalUrl:false,
                                IsExternalIFrame:false,
                                IconImageStyle:"fa fa-phone-square",
                                HasBadge:true,
                                BadgeCount: 0,
                                DisplayIndex:3
                            }
                        ],
                    },
                    {
                        Visible: false,
                        Id:432,
                        Name:"Vehicle",
                        Description:"Customer",
                        BadgeCount: 0,
                        ChildItems:[
                            {
                                Id:456,
                                Visible: false,
                                Name:"Customer List",
                                BadgeCount: 0,
                                Description:"Customer Listers",
                                ChildItems:[
                                    {
                                        Id:23,
                                        Visible: false,
                                        Name:"Hello world",
                                        Description:"Unanswered Emaiilers",
                                        ChildItems:[],
                                        ExternalUrl:"/crm/customer/unansweredemail",
                                        IsExternalUrl:false,
                                        IsExternalIFrame:false,
                                        IconImageStyle:"fa fa-envelope",
                                        HasBadge:true,
                                        BadgeCount: 0,
                                        DisplayIndex:2
                                    },
                                    {
                                        Id:12,
                                        Visible: false,
                                        Name:"This is the real life",
                                        Description:"Unanswered Emaiilers",
                                        ChildItems:[],
                                        ExternalUrl:"/crm/customer/unansweredemail",
                                        IsExternalUrl:false,
                                        IsExternalIFrame:false,
                                        IconImageStyle:"fa fa-envelope",
                                        HasBadge:true,
                                        BadgeCount: 0,
                                        DisplayIndex:2
                                    },
                                    {
                                        Id:345,
                                        Visible: false,
                                        Name:"Or just a fantasy",
                                        Description:"Unanswered Emaiilers",
                                        ChildItems:[],
                                        ExternalUrl:"/crm/customer/unansweredemail",
                                        IsExternalUrl:false,
                                        IsExternalIFrame:false,
                                        IconImageStyle:"fa fa-envelope",
                                        HasBadge:true,
                                        BadgeCount: 0,
                                        DisplayIndex:2
                                    },
                                ],
                                ExternalUrl:"/crm/customer/list",
                                IsExternalUrl:false,
                                IsExternalIFrame:false,
                                IconImageStyle:"fa fa-users",
                                HasBadge:true,
                                BadgeCount: 0,
                                DisplayIndex:1
                            },
                            {
                                Id:66,
                                Visible: false,
                                Name:"Unanswered Email",
                                Description:"Unanswered Emaiilers",
                                ChildItems:[],
                                ExternalUrl:"/crm/customer/unansweredemail",
                                IsExternalUrl:false,
                                IsExternalIFrame:false,
                                IconImageStyle:"fa fa-envelope",
                                HasBadge:true,
                                BadgeCount: 0,
                                DisplayIndex:2
                            },
                            {
                                Id:845,
                                Visible: false,
                                Name:"Incoming Callers",
                                Description:"Incoming Call",
                                ChildItems:[],
                                ExternalUrl:"/crm/customer/incomingcall",
                                IsExternalUrl:false,
                                IsExternalIFrame:false,
                                IconImageStyle:"fa fa-phone-square",
                                HasBadge:true,
                                BadgeCount: 0,
                                DisplayIndex:3
                            }
                        ],
                    }
                ],
                subscribers: {},
                currentData: null,
            }
        },
        methods: {
            subscribe(type,fn) {
                if ( !this.subscribers[type] ) this.subscribers[type] = [];
                if ( this.subscribers[type].indexOf(fn) == -1 ) this.subscribers[type].push(fn);
            },
            unsubscribe(type,fn) {
                let listeners = this.subscribers[type];
                if ( !listeners ) return;
                let index = listeners.indexOf(fn);
                if ( index > -1 ) listeners.splice(index,1);
            },
            publish(type,eventObj) {
                if ( !this.subscribers[type] ) return;
                if ( !eventObj.type ) eventObj.type = type;
                let listeners = this.subscribers[type];
                let length = listeners.length;
                 const publisher = item => {
                    item(eventObj);
                }
                forEach(listeners, publisher);
            },
            badgeManagement(id) {
                switch(id) {
                    case 456: //Vehicle
                        this.asyncOperation(23,3)
                        this.asyncOperation(12,6)
                        this.asyncOperation(345,8)
                        break;
                }
            },
            clickHandler(item,event) {
                // const fn = (data) => console.log(data.message);
                // this.subscribe(item.Id,fn);
                // this.publish(item.Id,{ message: "Heloworld" });
                // this.unsubscribe(item.Id,fn);
                // this.publish(item.Id,{ message: "Cannot be" });
                let type = item.Id;
                const fn = (data) => this.badgeManagement(data.Id);
                if ( item.Visible ) {
                    this.subscribe(type,fn);
                    this.publish(type,item);
                } else {
                    this.unsubscribe(type,fn);
                }
            },
            onLoadHandler() {
                forEach(this.appNav, (item,index) => {
                    switch(item.Id) {
                        case 432:
                            this.asyncOperation(item.Id,3)
                            break;
                        case 4:
                            this.asyncOperation(item.Id,2)
                            break;
                    }
                });
            },
            asyncOperation(id,count) {
                setTimeout(res => {
                    eventBus.$emit('changeBadgeCount', { id: id, count: count });
                },1000)
            },
            changeBadgeCount({ id, count}) {
                const idLookup = (navigation) => {
                    forEach(navigation, (item,index) => {
                        if ( item.Id === id ) {
                            item.BadgeCount = count;
                            return;
                        } else {
                            if ( item.ChildItems.length ) {
                                idLookup(item.ChildItems);
                            }
                        }
                    });
                }
                idLookup(this.appNav);
            },
            changeVisibility(item,e) {
                item.Visible = !item.Visible;
            },
        },
        mounted() {
            eventBus.$on('changeBadgeCount', this.changeBadgeCount );
            this.onLoadHandler();
        },
        beforeDestroy() {
            eventBus.$off('changeBadgeCount', this.changeBadgeCount );
            eventBus.$off('changeBadgeCount', this.changeBadgeCount );
        }
    }
</script>

<style scoped>
    .cursor-pointer {
        cursor: pointer;
    }
</style>