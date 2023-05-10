import { Select, Spin } from 'antd'
import { ReactElement, useEffect, useState } from 'react'
import { useLazyGetMyAllTaskQuery } from '../../../service/queries/useGetMyTask';
import { getFromStorage } from '../../../utils/localStorage';
import { IUserAuth } from '../../../models/IUserAuth';
import { IResultTask } from '../../../service/mutations/useTaskMutation';
import { useNotificationContext } from '../../../utils/notification';
import TextArea from 'antd/es/input/TextArea';
import { styled } from 'styled-components';
import { FormSumbitTusk } from './FormTask';
import moment from 'moment';
import { ClockCircleTwoTone } from '@ant-design/icons';

const my_id = getFromStorage<IUserAuth>("user")?.id


const ConditionTitle = styled.h1`
    font-size: 30px;
    margin-top: 30px;
`


const ConditionTask = styled.div`
    margin-top: 30px;
`

const TitleTask = styled.h2`
margin-top: 30px;
`


const ContainerAnswer = styled.div`
margin-top: 30px;
    
`

function Task(): ReactElement {
    const [isChoosed, setIsChoosed] = useState(false);
    const [allDataTrigger, { isLoading }] = useLazyGetMyAllTaskQuery()
    const [data, setData] = useState<IResultTask[]>([] as IResultTask[]);
    const { showMessage } = useNotificationContext()
    const [task, setTask] = useState<IResultTask>({} as IResultTask);

    useEffect(() => {
        if (my_id) {
            allDataTrigger(my_id).unwrap().then(data => setData(data)).catch(err => showMessage("Произошла ошибка при загрузке данных", "error"))
        }
    }, [])



    const onChange = async (id_task: any) => {
        setTask(data[data.findIndex(obj => obj.id === id_task)])
        setIsChoosed(true)
    };


    return (
        <>
            <Select
                placeholder="Выберите задание"
                optionFilterProp="children"
                style={{ width: 500 }}
                onChange={onChange}
                // onSearch={onSearch}
                // filterOption={(input, option) =>
                //     (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                // }
                options={data.map(element => {
                    return {
                        label:
                            <div>
                                <ClockCircleTwoTone />  {element.title}
                            </div>,
                        value: element.id,
                    }
                })}
            />

            {!isChoosed ? null :
                <>
                    {isLoading && <Spin size='large' />}
                    <ConditionTask>
                        <ConditionTitle>Название курса: {task.course.title}</ConditionTitle>
                        <TitleTask>Срок: с {moment(task.startDate).format("YYYY-MM-DD")} по {moment(task.endDate).format("YYYY-MM-DD")}</TitleTask>
                        <ConditionTitle>Условие задачи</ConditionTitle>
                        <TitleTask>Название задания: {task.title}</TitleTask>
                        <TextArea disabled={true} value={task.task_description} />

                    </ConditionTask>
                    <ContainerAnswer>
                        <TitleTask>Мой ответ</TitleTask>
                        <FormSumbitTusk task={task}/>
                    </ContainerAnswer>
                    <ContainerAnswer>
                        <TitleTask>Оценка</TitleTask>
                        {false ? <div>Ожидает проверки...</div> :
                            <>
                                <div>
                                    Оценка: {1}
                                </div>
                                <div>
                                    <TextArea disabled={true} value={"Здесь мой фид бэк"} />
                                </div>
                            </>
                        }
                    </ContainerAnswer>
                </>
            }
        </>
    )
}

export default Task