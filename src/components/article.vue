<template>
    <div class="mod-article">
    	<!-- ui-tab -->
    	<div class="ui-tab ui-tab1">
    	    <div class="tab-head">
    	        <div class="layout-wrapper">
    	            <ul class="tabmenu">
    	                <li class="on">CSS</li>
    	                <li>HTML</li>
    	            </ul>

                    <!-- com-search -->
                    <comSearch></comSearch>   
    	            <!-- /com-search -->

    	            <!-- ui-dropdown -->
    	            <div class="ui-dropdown">
    	                <a href="###" class="selector">
    	                    排序方式
    	                    <i class="dropdown-arrow"></i>
    	                </a>
    	                <div class="dropdown">
    	                    <ul class="droplist">
    	                        <li><a href="###" class="dropitem">最新</a></li>
    	                        <li><a href="###" class="dropitem">热门</a></li>
    	                    </ul>
    	                </div>
    	            </div>
    	            <!-- /ui-dropdown -->
    	            
                    <!-- com-tagcloud -->
                    <comTagcloud></comTagcloud>   
                    <!-- /com-tagcloud -->
    	        </div>
    	    </div>
    	    <div class="tab-body layout-wrapper">
    	        <div class="tab-eachcon on">
    	            <!-- com-list-article -->
                    <comListArticle></comListArticle>   
                    <!-- /com-list-article -->
    	        </div>
    	        <div class="tab-eachcon">
    	            2
    	        </div>
    	    </div>
    	</div>
    	<!-- /ui-tab --> 
    </div>
</template>

<script>
import comSearch from './common/search'
import comTagcloud from './common/tagcloud'
import comListArticle from './common/list-art'

export default {
    components: { comSearch,comTagcloud,comListArticle }
}
</script>
