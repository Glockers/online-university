import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { PageLayout } from '../../layouts';
import { Input, Select, Spin } from 'antd';
import { ESortType, ICourseResult, useGetCoursesQuery } from '../../service/queries/usetGetCourses';
import { CourseCard } from './CardCourse';
import { IResultOrderCourse, useBuyCourseMutation } from '../../service/mutations/buyCourseMutation';
import { useAppSelector } from '../../utils/hooks/redux';
import { useNotificationContext } from '../../utils/notification';
import { useNavigate } from 'react-router-dom';
import { EAppRoutes } from '../Router';

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
    const [buyCourse, { isError }] = useBuyCourseMutation();
    const { data, isLoading } = useGetCoursesQuery()
    const auth = useAppSelector(value => value.auth);
    const { showMessage } = useNotificationContext()
    const nav = useNavigate();

    const getSelectedCourse = (selectedCourse: ICourseResult) => {
        buyCourse({
            client: auth.user,
            course: selectedCourse
        }).unwrap().then(response => {
            window.location.href = response.url;
        })
    }


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        const success = urlParams.get('success');
        if (success === 'true') {
            nav(EAppRoutes.CATALOG)
            showMessage("Оплата прошла успешно", "error")
            console.log('Success!');
        }
    }, []);

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
            <Wrapper>
                {data?.map((book) => (
                    <CourseCard
                        key={book.id}
                        course={book}
                        onGetselectedCourse={getSelectedCourse}
                    // onRemove={removeItem}
                    />
                ))}
                {isLoading && <Spin size="large" />}
            </Wrapper>

        </Container>
    )
}
