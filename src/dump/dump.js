const greyhound_pool_fh= response.filter(name=>
    name.pool_fh.includes('greyhound'))
    .map(filteredName => { return(filteredName)});
const thoroughbred_pool_fh= response.filter(name=>
        name.pool_fh.includes('thoroughbred'))
        .map(filteredName => { return(filteredName)});
var slots_list=[];
for (var item, i = 0; item = greyhound_pool_fh[i++];) {
    var name = item.pool_fh.split("_")[4];
    slots_list.push(name)};
var slots=(_.countBy(slots_list));
slots= (Object.keys(slots))

var places_list=[];
for (var item, i = 0; item = greyhound_pool_fh[i++];) {
    var name = item.pool_fh.split("_")[3];
    places_list.push(name)};
var places=(_.countBy(places_list));
places= (Object.keys(places))

        // // return response.map(posts => {
        // //     return (
                    
        //         // <div className="item" key="posts.id">
        //         //     <i className="large middle aligned icon user"/>
        //         //     <div className="content">
        //         //         <div className="description">
        //         //             <p>{posts.pool_fh.split("_")[3]},
        //         //             {posts.pool_fh.split("_")[4]},
        //         //             {posts.pool_status}</p>
        //         //         </div>
        //         //     </div> 
        //         // </div>
        //     )
        // })
    };


        // componentDidMount() {
    //     this.props.fetchToday();
    // }    
    render() { 
        return(
            <div>
                {response}
            </div>
        )
// const mapStateToProps=(state)=> {
//     console.log(state)
//     return{ post:state}
// }
// export default connect(mapStateToProps, { fetchToday } )(Today_Race);