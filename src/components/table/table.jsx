import React from "react";
import classnames from "classnames";
import Checkbox from "../checkbox/checkbox.jsx";
import Pagination from  "./pagination/pagination.jsx";
import PropTypes from 'prop-types';
import "./table.scss";
class Table extends React.Component{
    static propTypes = {
        data: PropTypes.array,
        column: PropTypes.array,
        loading: PropTypes.bool,
        hasBoder: PropTypes.bool,
        tableWidth: PropTypes.string,
        pagination: PropTypes.object
    };
    static defaultProps ={
        data: [],//表格原始数据
        column: [],//展现的列
        loading: false,//加载中图片，若不传默认false
        hasBoder: false,//是否有边框,若不传默认false
        tableWidth:"100%",//表格宽度(如tableWidth="500px")，若不传默认100%
        pagination: false//是否有分页，若不传默认false
    };
    constructor(props){
        super(props);
        this.state={
            sortOrder:0,
            initData:props.data
        };
        this.onPageChange=this.onPageChange.bind(this);
        this.checkedSingleChange=this.checkedSingleChange.bind(this);
        this.checkIsCheckedAll=this.checkIsCheckedAll.bind(this);
        this.checkedAllChange=this.checkedAllChange.bind(this);
        this.sortOption=this.sortOption.bind(this);
        this.compareSort=this.compareSort.bind(this);
        this.selectArr=[];
    }
    onPageChange(page){
        let {pagination}=this.props;
        this.state.sortOrder=(page.pageNo-1)*page.pageSize;
        pagination.onPageChange(page)
    }
    checkedSingleChange(checked,itemDetail){
        itemDetail.isChecked=checked;
        checked ?
            this.selectArr.push(itemDetail):
            (
                this.selectArr.some((item,i)=>{
                    if(itemDetail.id==item.id){
                        return this.selectArr.splice(i,1);
                    }
                })
            );
        this.checkIsCheckedAll()
    }
    checkedAllChange(){
        let {checkedAll,initData}=this.state;
        if(!checkedAll){
            this.selectArr=[...initData];
        }else {
            this.selectArr=[]
        }
        initData.length>0 && initData.map((item)=>{
            item.isChecked=!checkedAll
        });
        this.checkIsCheckedAll()
    }
    checkIsCheckedAll(){
        let {initData}=this.state;
        let equalAll=this.selectArr.length===initData.length;
        this.props.onSelect(this.selectArr);
        this.setState({checkedAll:equalAll})
    }
    compareSort(property,accordType){
        return (obj1,obj2)=>{
            let value1 = obj1[property],value2 = obj2[property];
            switch (accordType){
                case "asc":return value1 - value2;break;// 升序
                case "des":return value2 - value1;break;// 降序
            }
        }
    }
    sortOption(sortItem,accordType){
        let {initData}=this.state;
        initData.sort(this.compareSort(sortItem,accordType));
        this.setState({initData})
    }
    componentWillReceiveProps(nextProps){
        this.state.initData=nextProps.data;
    }
    render(){
        let {sortOrder,checkedAll,initData}=this.state;
        let {
            column,//展现的列
            loading,//加载中图片，若不传默认false
            hasBoder,//是否有边框,若不传默认false
            tableWidth,//表格宽度(如tableWidth="500px")，若不传默认100%
            pagination//是否有分页，若不传默认false
        }=this.props;
        let totalColNum=column.length;
        initData.length>0 && initData.map((item,i)=>{
            item.tdValue=[];
            item.id=item.id?item.id:i;//若数据中没有id，这定义id为循环序号
            item.isChecked=item.isChecked?item.isChecked:false;
            column.forEach((colItem)=>{
                let formatcolVal;
                switch (colItem.colName){
                    case "orderNum":formatcolVal=sortOrder+i+1;break;
                    case "checkBox":
                        formatcolVal=
                            <Checkbox sendChecked={item.isChecked} onCheckedChange={this.checkedSingleChange} itemDetail={item}/>;
                        break;
                    case "operate":
                        let keyVal=Object.keys(colItem.cell)[0],Cell=colItem.cell[keyVal];
                        formatcolVal=
                            <Cell
                                onCellEvent={(...others)=>{
                                    let itemDetailCallBk={...item};
                                    delete itemDetailCallBk.tdValue;
                                    colItem.onCellEvent(itemDetailCallBk,...others)}
                                }
                            />;
                        break;
                    default:formatcolVal=item[colItem.colName]
                }
                let formatObj={};
                formatObj.val=formatcolVal;
                colItem.fontColor ? formatObj.color=colItem.fontColor:null;
                item.tdValue.push(formatObj);
            })
        });
        return(
            <div className={classnames("tableBox",{hasBoder:hasBoder})} style={{width:tableWidth}}>
                <table cellPadding="0" cellSpacing="0">
                    <thead>
                    <tr>
                        {column.map((item,i)=>{
                            return(
                                <th key={i}
                                    style={{width:item.width}}
                                >
                                        <span>
                                            {item.title==="checkBox"?
                                                <Checkbox sendChecked={checkedAll} onCheckedChange={this.checkedAllChange}/>:
                                                item.title
                                            }
                                        </span>
                                    {
                                        item.sort?
                                            <ul className="attachSign">
                                                <li className="asc" onClick={()=>{this.sortOption(item.colName,"asc")}}/>
                                                <li className="des" onClick={()=>{this.sortOption(item.colName,"des")}}/>
                                            </ul>:null
                                    }
                                </th>
                            )
                        })}
                    </tr>


                    </thead>
                    <tbody className="tbodyControl">
                    {
                        loading ?
                            <tr>
                                <td colSpan={totalColNum}>
                                    <img src={require("./images/loading.gif")}/>
                                </td>
                            </tr>:
                            (
                                initData.length>0 ?
                                    initData.map((item,i)=>{
                                        return <tr key={i}>
                                            {
                                                item.tdValue.map((tdVal,j)=>{
                                                    return <td style={{color:tdVal.color}} key={j}>{tdVal.val}</td>
                                                })
                                            }
                                        </tr>
                                    }):
                                    <tr><td colSpan={totalColNum}>没有数据</td></tr>
                            )
                    }
                    </tbody>
                </table>
                {
                    pagination && pagination.total?
                        <Pagination total={pagination.total}  paginationWidth={tableWidth} showGoPage={pagination.showGoPage} onPageChange={this.onPageChange}/>:null
                }
            </div>
        )
    }
}

export default Table
