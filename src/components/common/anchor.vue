<template>
    <div class="com-anchor" :class="type">
        <ul class="anchorwrap">
            <li class="anchor-item" v-for="item1 in anchorlist" v-if="item1.title.length>0">
                <a class="anchor-link">{{item1.title}}</a>
                <ul class="anchor-subitem" v-if="item1.child.length>0">
                    <li class="anchor-item" v-for="item2 in item1.child">
                        <a class="anchor-link">{{item2.title}}</a>
                        <ul class="anchor-subitem" v-if="item2.child.length>0">
                            <li class="anchor-item" v-for="item3 in item2.child">
                                <a class="anchor-link">{{item3.title}}</a>
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
                    child: ''
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

