import { Layout } from 'antd';
import React from 'react';
import { ContentHeader, SummaryTable } from '../components';

export const Summary = () => {
    return (
        <Layout>
            <ContentHeader title='Сводные данные' />
            <Layout.Content style={{ margin: '27px 34px' }}>
                <SummaryTable />
            </Layout.Content>
        </Layout>
    );
};
