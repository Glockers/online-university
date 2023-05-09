import React, { useState } from 'react'
import styled from 'styled-components';
import { PageLayout } from '../../layouts';
import { Input, Select } from 'antd';
import { ESortType, useGetCoursesQuery } from '../../service/queries/usetGetCourses';

const Container = styled(PageLayout)`
  width: 100%;
  display: grid;
  min-width: 320px;
  grid-template-rows: 72px 1fr;
  grid-template-columns: 1fr;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  padding: 12px;
`;

export default function Catalog() {
    const [search, setSearch] = useState<string>();
    const [sort, setSort] = useState<ESortType>();

    const { data } = useGetCoursesQuery()

    console.log(data);


    return (
        <Container style={{ display: "grid" }}>
            <Wrapper>
                <Input.Search
                    style={{ width: "100%", maxWidth: "420px" }}
                    placeholder="Поиск"
                    onChange={(e) => {
                        setSearch(e.currentTarget.value);
                    }}
                    value={search}
                />
                <Select
                    defaultValue=""
                    style={{ width: 180 }}
                    onChange={(e) => setSort(e ? (e as ESortType) : undefined)}
                    options={[
                        { value: "", label: "не выбрано" },
                        { value: ESortType.MONY_HIGHT, label: "BYN по возрастанию" },
                        { value: ESortType.MONY_LOW, label: "BYN по убыванию" },
                    ]}
                />
            </Wrapper>

        </Container>
    )
}
