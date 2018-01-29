import React from "react";
import classNames from "classnames";
import Select from "../../../components/select/select.jsx";
import "./pagination.scss"
import PropTypes from 'prop-types';
class Pagination extends React.Component{
    static propTypes={
        onJump: PropTypes.func,
        onSelect:PropTypes.func,
        total:PropTypes.number,
        pageNo:PropTypes.number,
        pageCount:PropTypes.number
    };
  constructor(props){
    super(props);
    this.state={
        pageNo: props.pageNo || 1,
        pageSize:props.pageSize || 10,
        total:props.total,
        notSearch: false,
        turnPage:'',
        stretchLength:props.stretchLength || 3
    };
    this.renderPagination=this.renderPagination.bind(this);
    this.onSelect=this.onSelect.bind(this);
    this.reset=this.reset.bind(this);
    this.paging=this.paging.bind(this);
    this.goPage=this.goPage.bind(this);
    this.onSelectChange=this.onSelectChange.bind(this);
  }
  componentWillReceiveProps(newProps){
      let {pageNo,total,pageSize,notSearch } = this.state;
      let prevTotal = total;
      total = newProps.total;
      let pageCount = total % pageSize == 0 ? total / pageSize : parseInt(total / pageSize) + 1;
      this.renderPagination(pageNo);
      this.setState({
          pageNo: pageNo,
          pageCount: pageCount,
          total:total,
          pageSize:pageSize,
          notSearch: notSearch
      });
      return false;
  }
  componentDidMount(){
      let {total,pageSize,pageNo} = this.state;
      let pageCount = total % pageSize == 0 ? total / pageSize : parseInt(total / pageSize) + 1;
      this.setState({
          pageNo: pageNo || 1,
          pageSize:pageSize || 10,
          pageCount: pageCount,
          total:total
      });
  }
  renderPagination(pageNo) {
        let {total}= this.props;
        let { pageCount,stretchLength}=this.state;
        let array=[],start,end;
        if(pageNo > stretchLength){
            if(pageNo > (pageCount - stretchLength)){
                end =  pageNo + (pageCount - pageNo);
                start = (pageNo - stretchLength);
            }else{
                end = pageNo + stretchLength;
                start = pageNo - stretchLength;
            }
        }else{
            start = 1;
            end = pageCount <= (stretchLength * 2) ? pageCount : stretchLength * 2;
        }
        for(let i=start;i<=end;i++){
            array.push(i)
        }
        return array;
    }
  onSelect(pageNo){
        this.setState({
            pageNo,
            notSearch: true
        });
        let pagination = this.state;
        pagination.pageNo = pageNo;
        this.props.onPageChange(pagination);
    }
  reset(pageNo){
      this.state.pageNo =pageNo || 1;
      this.state.notSearch=true;
  }
  paging(action){
        let { pageNo } = this.state;
        let pagination = this.state;
        if (action === 'prev') {
            this.setState({
                pageNo: pageNo - 1,
                notSearch: true
            });
            pagination.pageNo = pageNo - 1;
        }
        if (action === 'next') {
            this.setState({
                pageNo: pageNo + 1,
                notSearch: true
            });
            pagination.pageNo = pageNo + 1;
        }
        this.props.onPageChange(pagination);
    }
  goPage(){
        let {pageNo,pageCount,turnPage} = this.state;
        let pagination = this.state;
        let  val =  turnPage;
        if( /^\d+$/.test(val) &&  ( val >=1 && val <= pageCount) ) {
            val = parseInt(val, 10);
            this.setState({
                pageNo: val,
                notSearch: true
            });
            pagination.pageNo = val;
            this.props.onPageChange(pagination);
        }
        this.setState({
            turnPage:''
        })
    }
    onSelectChange(obj){
        let {total,notSearch} = this.props;
        let pageSize = parseInt(obj.value);
        let pageCount = total % pageSize === 0 ? total / pageSize : parseInt(total / pageSize) + 1;
        this.setState({
            pageSize: obj.value,
            pageCount:pageCount,
            notSearch: true
        });
        let pagination = this.state;
        pagination.pageNo = 1;
        pagination.pageSize = pageSize;
        this.props.onPageChange(pagination);
    }
  render(){
        let { pageNo,total,pageCount,pageSize,turnPage} = this.state,
            {showGoPage,paginationWidth} = this.props,
            itemsArray = this.renderPagination(pageNo),
            len = itemsArray.length,
            index =  itemsArray.findIndex((n)=>{
                return n === pageNo;
            }),
            idx =  index + 3;
        idx = idx > len ? len : idx;
        let arr = itemsArray.slice(0, idx);
        let paginationWidthCalculate=paginationWidth-22;
        return (
            <div className="pagination-area" style={{width:`${paginationWidthCalculate}px` || "100%"}}>
                <div className="leftItem">
                    <p>合计<span className="numberText">{total}</span>条</p>
                    <div className="selectPage">
                        每页
                        <Select className='JokerSelect' width="50px" height="25px"
                            optionGroup={
                                [
                                    {id:0,value:5},
                                    {id:1,value:10},
                                    {id:2,value:15},
                                    {id:3,value:20},
                                ]
                            }
                            defaultSelect={pageSize}
                            onSelectChange={this.onSelectChange}
                        />
                        条，共<span className="numberText">{pageCount}</span>页
                    </div>
                    {
                        showGoPage || showGoPage===undefined?
                            <p className="goPage">
                                跳转到
                                <input value={turnPage}
                                       onChange={
                                           (e)=>{
                                               let goPageNum=e.target.value.replace(/[^\d]*/g,'');
                                               if(goPageNum.charAt(0)===0){
                                                   goPageNum=goPageNum.replace(0,"")
                                               }
                                               this.setState({turnPage:goPageNum})
                                           }
                                       }
                                />
                                <button onClick={this.goPage}>确定</button>
                            </p>:null
                    }
                </div>
                <div className="rightItem">
                    <button className={classNames("lastPage",{notShow:pageNo <= 1})} onClick={()=>{this.paging("prev")}}>上一页</button>
                    {
                        arr.map((item,i)=>{
                            return (
                                <button
                                    key={`pageItem${i}`}
                                    className={classNames("numSign",{active: item === pageNo})}
                                    onClick={() => {this.onSelect(item)}}
                                >{item}</button>
                            )
                        })
                    }
                    <button className={classNames("nextPage",{notShow:pageNo >= pageCount})} onClick={()=>{this.paging("next")}}>下一页</button>
                </div>
            </div>
        );
    }
}

export default Pagination