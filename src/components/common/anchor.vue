<template>
    <div class="com-anchor" :class="type">
        <ul class="anchorwrap">
<<<<<<< HEAD
            <li class="anchor-item" v-for="item1 in anchorlist">
                <a class="anchor-link" v-if="item1.title.length>0">{{item1.title}}</a>
                <ul class="anchor-subitem" v-if="item1.child && item1.child.length>0">
=======
            <li class="anchor-item" v-for="item1 in anchorlist" v-if="item1.title.length>0">
                <a class="anchor-link">{{item1.title}}</a>
                <ul class="anchor-subitem" v-if="item1.child.length>0">
>>>>>>> 1b2ab83116eda741d7ba897f89d32951450d3c02
                    <li class="anchor-item" v-for="item2 in item1.child">
                        <a class="anchor-link" v-if="item2.title.length>0">{{item2.title}}</a>
                        <ul class="anchor-subitem" v-if="item2.child && item2.child.length>0">
                            <li class="anchor-item" v-for="item3 in item2.child">
                                <a class="anchor-link">{{item3.title}}</a>
                                <ul class="anchor-subitem" v-if="item3.child && item3.child.length>0">
                                    <li class="anchor-item" v-for="item4 in item3.child">
                                        <a class="anchor-link">{{item4.title}}</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
        
    </div>
</template>
<script>

export default {
    components: {  },
    data () {
        return {
            anchorlist: [
                {
                    title: '',
<<<<<<< HEAD
                    child: [
                        {
                            title: '标题2.2',
                            child: [
                                { title: '标题2.2.1',child: '' },
                                { title: '标题2.2.2',child: '' },
                                { 
                                    title: '标题2.2.3',
                                    child: [
                                        { title: '标题2.2.1.1',child: '' },
                                        { title: '标题2.2.2.2',child: '' }
                                    ]
                                }
                            ]
                        }
                    ]
=======
                    child: ''
>>>>>>> 1b2ab83116eda741d7ba897f89d32951450d3c02
                },
                {
                    title: '标题2',
                    child: [
                        {
                            title: '标题2.1',
                            child: ''
                        },
                        {
                            title: '标题2.2',
                            child: [
                                { title: '标题2.2.1',child: '' },
                                { title: '标题2.2.2',child: '' },
                                { title: '标题2.2.3',child: '' }
                            ]
                        },
                        {
                            title: '标题2.3',
                            child: ''
                        },
                    ]
                },
                {
                    title: '标题3',
                    child: ''
                }
            ]
        }
    },
    props: [ 'type'],
    mounted: function(){
        this.event_scroll();
        
    },
    computed: {
        
    },
    methods: {
        event_scroll(){
            window.scrollTo(function(){
                var scrollTop = window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop;
        console.log(scrollTop);
            })
        }
    }
}
</script>


<style lang="scss">


</style>

