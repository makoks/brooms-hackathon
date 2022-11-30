import { Button, Layout } from 'antd';
import React, { useState } from 'react';
import { ContentHeader, SummaryTable } from '../components';
import { ExcelIcon } from '../components/common/Icons/ExcelIcon';

export const Summary = () => {
    const [isExcelDisabled] = useState(true);

    return (
        <Layout>
            <ContentHeader title='Сводные данные' paddingBottom={true}>
                <div style={{ display: "flex", alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Button
                        style={{ marginRight: 10 }}
                        icon={<ExcelIcon disabled={isExcelDisabled} />}
                        disabled={isExcelDisabled}
                        size='large' type='text'
                    />
                </div>
            </ContentHeader>
            <Layout.Content style={{ margin: '27px 34px' }}>
                <SummaryTable />
            </Layout.Content>
        </Layout>
    );
};
