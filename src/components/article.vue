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
    	            <comDropdown></comDropdown>   
    	            <!-- /ui-dropdown -->
    	            
                    <!-- com-tagcloud -->
                    <comTagcloud></comTagcloud>   
                    <!-- /com-tagcloud -->
    	        </div>
    	    </div>
    	    <div class="tab-body layout-wrapper">
    	        <div class="tab-eachcon">
    	            <!-- com-list-article -->
                    <comListArticle></comListArticle>   
                    <!-- /com-list-article -->
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
import comDropdown from './common/dropdown'

export default {
    components: { comSearch,comTagcloud,comListArticle,comDropdown }
}
</script>
