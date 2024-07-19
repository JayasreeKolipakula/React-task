import { DataTable } from "pepsico-ds";
function DisplayTable(records){
    return(<>
    <DataTable
                columns={[
                    { columnKey: 'username', header: 'UserName' },
                    { columnKey: 'email', header: 'Email' },
                    { columnKey: 'password', header: 'Password' },
                    { columnKey: 'gender', header: 'Gender' },
                    { columnKey: 'age', header: 'Age' },
                    { columnKey: 'skills', header: 'Skills' },
                    { columnKey: 'remebertheinfo', header: 'RememberTheInfo' }
                ]}
                data={records.map(record => ({
                    username: record.username,
                    email: record.email,
                    password: record.password,
                    gender: record.gender,
                    age: record.age,
                    skills: record.skills,
                    remembertheinfo: record.rememberInfo ? 'True' : 'False'
                }))}
                headerAction={{
                    iconTrailing: 'arrow_forward',
                    onClick: () => { },
                    size: 'small',
                    text: 'Button',
                    variant: 'primary'
                }}
                pageIndex={0}
                pageSize={10}
                renderSubComponent=""
                selection="single"
                size="large"
            />    
    </>);
}
export default DisplayTable;