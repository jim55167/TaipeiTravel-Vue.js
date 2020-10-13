Vue.component('paginate', VuejsPaginate)

var app = new Vue({
  el:'#app',
  data:{
    data:[],
    location:[],
    filter:'',
    lightBox:false,
    currentPage: 1,
    page_size: 16,
    pageCount: 1,
    areaDetail: [],
  },
  created: function(){
    this.addData();
  },
  methods: {
    addData: function(){
      const vm = this;
      let api = 'https://data.taipei/api/v1/dataset/36847f3f-deff-4183-a5bb-800737591de5?scope=resourceAquire';
      $.get(api).then(function(response){
        let attractions = response.result.results;
        attractions.forEach(function(item, index){
          let imgList = item.file.split('http://');
          imgList.splice(0,1);
          item.file = imgList;
          if (item.address.indexOf('臺北市沿淡水河、基隆河及新店溪河岸兩側向下游延伸至關渡濕地，南起景美、東至內湖') > -1){
            item.address = '';
          }         
        })
        vm.data = attractions
        console.log(vm.data);  
      })
    },
    focusLocation: function(item){
      const vm = this;
        vm.lightBox = !vm.lightBox; 
        vm.areaDetail.push(item)
        console.log(vm.areaDetail);
    },
    cancelLocation: function(){
      const vm = this;
      vm.areaDetail.splice(0, 1)
      // vm.lightBox = !vm.lightBox;
    },    
    pageCallback: function(pageNum) {
      const vm = this;
      vm.$set(vm, 'currentPage', pageNum);
      console.log(pageNum);
    }, 
    areaItem: function(taipei){
      const vm = this;
      let pageTotal = taipei.length % vm.page_size === 0 ? taipei.length / vm.page_size : Math.ceil(taipei.length / vm.page_size); 
      let pageNumber = 1;
      vm.pageCount = pageTotal;
      taipei.forEach(function(item,index){
        if(index < (vm.page_size * pageNumber)){ 
          vm.$set(item, "paginate", pageNumber);    
        } 
        if((index+1) == (vm.page_size * pageNumber) && pageNumber < pageTotal) { 
          pageNumber++
        }
      })
      let pageData = taipei.filter(function (item) {
        return item.paginate === vm.currentPage;
     })
     return pageData;
    }      
  },
  computed: {
    filterDatas: function(){
      const vm = this;
      if(vm.filter === ''){
        let pageTotal = vm.data.length % vm.page_size === 0 ? vm.data.length / vm.page_size : Math.ceil(vm.data.length / vm.page_size);
        let pageNumber = 1;
        vm.pageCount = pageTotal;
        vm.data.forEach(function(item,index){
          if(index < (vm.page_size * pageNumber)){
            vm.$set(item, "paginate", pageNumber);    
          } 
          if((index+1) == (vm.page_size * pageNumber) && pageNumber < pageTotal) {
            pageNumber++
          }   
          // console.log(item);
        })
        let pageData =  vm.data.filter(function (item) {
               return item.paginate === vm.currentPage;
            })
            return pageData;
      }else{
        let area = vm.data.filter(function(item){          
          //  return item.address.substr(5, 3) === vm.filter;
           return item.address.indexOf(vm.filter) > -1
        })
        return vm.areaItem(area);
      }
    },
    countys: function(){
      const vm = this;
      let location = [];
      vm.data.forEach(function(item){
          if(location.indexOf(item.address.substr(5, 3)) == -1){
            location.push(item.address.substr(5, 3));
          }
      });
      return location;
    }
  }
})