import { Form, Select, Button } from 'antd'
import { useFormik } from 'formik'
import { useSearchParams } from 'react-router-dom'
import { changeSearchParams } from '../../../utils'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/redux-store'
import { IFilter } from '../../../types'
import {
    changeFilterValueAC,
    getTasksApiAC,
} from '../../../redux/actions/tasksActions'
import { useSelector } from 'react-redux'
import { filterSelector } from '../../../selectors/tasksSelectors'
import { useEffect } from 'react'

type PropsType = {}

export const taskFilterValues: Array<number | string> = [
    'All',
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
]
export const difficultyFilterValues: Array<number | string> = [
    'All',
    1,
    2,
    3,
    4,
    5,
]
export const difficultySortFilterValues: Array<string> = ['1', '-1']

const TasksFilter: React.FC<PropsType> = (): JSX.Element => {
    const [form] = Form.useForm()
    const dispatch: AppDispatch = useDispatch()

    const filter: IFilter = useSelector(filterSelector)

    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        dispatch(
            changeFilterValueAC({
                difficulty:
                    searchParams.has('difficulty') &&
                    searchParams.get('difficulty') !== 'All'
                        ? Number(searchParams.get('difficulty'))
                        : undefined,
                difficultySort: searchParams.has('difficultySort')
                    ? String(searchParams.get('difficultySort'))
                    : '1',
                taskNumber:
                    searchParams.has('taskNumber') &&
                    searchParams.get('taskNumber') !== 'All'
                        ? Number(searchParams.get('taskNumber'))
                        : undefined,
            })
        )
    }, [])

    const formik = useFormik({
        initialValues: {
            difficulty: difficultyFilterValues[0],
            taskNumber: taskFilterValues[0],
            difficultySort: difficultySortFilterValues[0],
        },
        onSubmit: (values) => {
            formik.setSubmitting(true)

            changeSearchParams(values, searchParams, setSearchParams)

            const filter: IFilter = {
                taskNumber:
                    values.taskNumber === 'All'
                        ? undefined
                        : (values.taskNumber as number),
                difficulty:
                    values.difficulty === 'All'
                        ? undefined
                        : (values.difficulty as number),
                difficultySort: values.difficultySort as string,
            }

            dispatch(changeFilterValueAC(filter))

            formik.setSubmitting(false)
        },
        onReset: (values) => {
            Object.keys(values).forEach((el, index, array) => {
                searchParams.delete(el)

                if (index === array.length - 1) setSearchParams(searchParams)
            })

            form.resetFields()

            dispatch(
                changeFilterValueAC({
                    difficulty: undefined,
                    difficultySort: '1',
                    taskNumber: undefined,
                })
            )

            dispatch(
                getTasksApiAC(1, Number(searchParams.get('pageSize')), filter)
            )
        },
    })

    useEffect(() => {
        formik.setValues({
            difficulty:
                filter.difficulty !== undefined
                    ? String(filter.difficulty)
                    : difficultyFilterValues[0],
            difficultySort:
                filter.difficultySort !== undefined
                    ? String(filter.difficultySort)
                    : difficultySortFilterValues[0],
            taskNumber:
                filter.taskNumber !== undefined
                    ? String(filter.taskNumber)
                    : taskFilterValues[0],
        })

        form.setFieldsValue({
            difficulty: filter.difficulty
                ? filter.difficulty
                : difficultyFilterValues[0],
            difficultySort: filter.difficultySort
                ? filter.difficultySort
                : difficultySortFilterValues[0],
            taskNumber: filter.taskNumber
                ? filter.taskNumber
                : taskFilterValues[0],
        })
    }, [filter])

    return (
        <Form
            form={form}
            layout="inline"
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid #cccfcd',
                borderTop: '1px solid #cccfcd',
                padding: '15px 5px',
                boxShadow: '10px 5px 5px #d9dedb',
            }}
            onFinish={formik.handleSubmit}
        >
            <Form.Item
                initialValue={formik.initialValues.taskNumber}
                style={{
                    width: '200px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                }}
                label="№ Задания:"
                name="taskNumber"
            >
                <Select
                    value={String(formik.values.taskNumber)}
                    onChange={(value: string) =>
                        formik.setFieldValue('taskNumber', value)
                    }
                >
                    {taskFilterValues.map((elem, index) => {
                        return (
                            <Select.Option key={elem} value={elem}>
                                {index === 0 ? 'Все' : elem}
                            </Select.Option>
                        )
                    })}
                </Select>
            </Form.Item>
            <Form.Item
                initialValue={formik.initialValues.difficulty}
                style={{
                    width: '200px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                }}
                label="Сложность:"
                name="difficulty"
            >
                <Select
                    value={String(formik.values.difficulty)}
                    onChange={(value: string) =>
                        formik.setFieldValue('difficulty', value)
                    }
                >
                    {difficultyFilterValues.map((elem, index) => {
                        return (
                            <Select.Option key={elem} value={elem}>
                                {index === 0 ? 'Все' : elem}
                            </Select.Option>
                        )
                    })}
                </Select>
            </Form.Item>
            <Form.Item
                initialValue={formik.initialValues.difficultySort}
                style={{
                    width: '350px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                }}
                label="Сортировка:"
                name="difficultySort"
            >
                <Select
                    value={formik.values.difficultySort}
                    onChange={(value: string) =>
                        formik.setFieldValue('difficultySort', value)
                    }
                >
                    {difficultySortFilterValues.map((elem, index) => {
                        switch (elem) {
                            case '1':
                                return (
                                    <Select.Option key={index} value={elem}>
                                        От легкого к сложному
                                    </Select.Option>
                                )

                            case '-1':
                                return (
                                    <Select.Option key={index} value={elem}>
                                        От сложного к легкому
                                    </Select.Option>
                                )

                            default:
                                return false
                        }
                    })}
                </Select>
            </Form.Item>
            <Button
                htmlType="reset"
                style={{ textTransform: 'uppercase' }}
                onClick={formik.handleReset}
            >
                Сбросить
            </Button>
            <Button htmlType="submit" style={{ textTransform: 'uppercase' }}>
                Поиск
            </Button>
        </Form>
    )
}

export default TasksFilter
