<template>
    <div>
        <div v-for="(item,index) in appNav" :key="index">
            <div v-if="item.ChildItems.length">
                <!-- First Level Dropdown -->
                <h3 class="cursor-pointer" @click="changeVisibility(item),clickHandler(item)">{{item.Name}} + <b-badge v-if="item.BadgeCount" variant="danger">{{item.BadgeCount}}</b-badge>  </h3>
                <template v-if="item.Visible">
                <div v-for="(childL1,index) in item.ChildItems" :key="index">
                    <template v-if="childL1.ChildItems.length">
                        <!-- Second Level Dropdown -->
                        <h6 class="cursor-pointer" @click="changeVisibility(childL1),clickHandler(childL1)">{{childL1.Name}} + <b-badge v-if="childL1.BadgeCount" variant="danger">{{childL1.BadgeCount}}</b-badge></h6>
                        <template v-if="childL1.Visible">
                        <div v-for="(childL2,index) in childL1.ChildItems" :key="index">
                            <div class="pl-4">{{ childL2.Name }} <b-badge v-if="childL2.BadgeCount" variant="danger">{{childL2.BadgeCount}}</b-badge></div>
                        </div>
                        </template>
                        <!-- End Second Level Dropdown -->
                    </template>
                    <template v-else>
                        {{ childL1.Name }} <b-badge v-if="childL1.BadgeCount" variant="danger">{{childL1.BadgeCount}}</b-badge>
                    </template>
                </div>
                </template>
                <!-- End First Level Dropdown -->

            </div>
            <div v-else>
                {{ item.Name }}
            </div>
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
            }
        },
        methods: {
            clickHandler(item) {
            if ( item.Visible ) {
                switch(item.Id) {
                case 456:
                    this.asyncOperation(23,3)
                    this.asyncOperation(12,6)
                    this.asyncOperation(345,8)
                    break;
                }
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
                },5000)
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
        }
    }
</script>

<style scoped>
    .cursor-pointer {
        cursor: pointer;
    }
</style>