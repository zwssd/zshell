import React, {Component} from 'react';
import {List, Button, Skeleton, Modal } from 'antd';

const count = 10;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender&noinfo`;

class ListSsh extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initLoading: true,
            loading: false,
            data: [],
            list: [],
        };
    };

    onLoadMore = () => {
        this.setState({
            loading: true,
            list: this.state.data.concat(
                [...new Array(count)].map(() => ({ loading: true, name: {}, picture: {} })),
            ),
        });
        fetch(fakeDataUrl)
            .then(res => res.json())
            .then(res => {
                const data = this.state.data.concat(res.results);
                this.setState(
                    {
                        data,
                        list: data,
                        loading: false,
                    },
                    () => {
                        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                        // In real scene, you can using public method of react-virtualized:
                        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                        window.dispatchEvent(new Event('resize'));
                    },
                );
            });
    };

    handleOk = () => {
        this.props.onOk(false, this.state.label, this.state.host, this.state.port, this.state.uname, this.state.passwd);
    };
    handleCancel = () => {
        this.props.onCancel(false);
    };

    render(){
        const { initLoading, loading, list } = this.state;
        const loadMore =
            !initLoading && !loading ? (
                <div
                    style={{
                        textAlign: 'center',
                        marginTop: 12,
                        height: 32,
                        lineHeight: '32px',
                    }}
                >
                    <Button onClick={this.onLoadMore}>loading more</Button>
                </div>
            ) : null;
        return (
            <>
                <Modal title="ssh列表" visible={this.props.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <List
                        className="demo-loadmore-list"
                        loading={initLoading}
                        itemLayout="horizontal"
                        loadMore={loadMore}
                        dataSource={list}
                        renderItem={item => (
                            <List.Item
                                actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                            >
                                <Skeleton avatar title={false} loading={item.loading} active>
                                    <List.Item.Met />}
                                    host={item.name}
                                    port={item.port}
                                    uname={item.uname}
                                    passwd={item.passwd}
                                    />
                                    <div>content</div>
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                </Modal>
            </>
        );
    }

};

export default ListSsh;