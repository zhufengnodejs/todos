angular.module('todoApp').factory('todoService',function($resource){
    /**
     * get 获取单个资源
     * query 查询所有资源
     * save 保存资源
     * remove 删除资源
     * delete 删除资源
     */
    var resource = $resource('http://localhost:8080/todos/:id',null,{
        update:{
            method:'PUT'
        }
    });
    return {
        //查询所有用户
        query:function(){
            return resource.query().$promise;
        },
        save:function(todo){
            return resource.save(todo).$promise;
        },
        delete:function(todo){
            return resource.delete(todo).$promise;
        },
        deleteCompleted:function(todo){
            return resource.delete().$promise;
        },
        update:function(todo){
            return resource.update({id:todo.id},todo).$promise;
        }
    }

});