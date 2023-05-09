import { Button, Card, Image, Avatar } from "antd";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { ICourseResult } from "../../service/queries/usetGetCourses";
import { generatedImage } from "../../assets/image_course";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/redux";
import { IPropsOrderCourse } from "../../service/mutations/buyCourseMutation";

const { Meta } = Card;

export const CourseCard = ({
    course,
    isSelected,
    onGetselectedCourse,
    // onRemove,
}: {
    course: ICourseResult;
    isSelected?: boolean;
    onGetselectedCourse: (data: ICourseResult) => void;
    // onRemove: (id: string) => void;
}): ReactElement => {
    const nav = useNavigate();


    return (
        <Card
            style={{ width: 300, paddingBottom: 36 }}
            cover={
                <Image
                    alt="example"
                    src={generatedImage[Math.floor(Math.random() * generatedImage.length)]}
                    style={{ objectFit: "cover" }}
                    height={200}
                />
            }
        >
            <Meta style={{ marginBottom: 16 }} title={`${course.cost} BYN`} />
            <Meta title={course.title} description={course.description} />
            <div style={{ position: "absolute", bottom: 8, display: "flex", gap: 8 }}>
                {!isSelected && (
                    <Button onClick={() => onGetselectedCourse(course)}>
                        Оплатить
                    </Button>
                )}
                {/* {isSelected && (
                    <>
                        <Button onClick={() => nav(EAppRoutes.CART)} type="primary">
                            Перейти в корзину
                        </Button>
                        <Button onClick={() => onRemove(book.id)} type="dashed">
                            Удалить
                        </Button>
                    </>
                )} */}
            </div>
        </Card>
    );
};