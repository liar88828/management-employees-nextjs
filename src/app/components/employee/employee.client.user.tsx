'use client'
//
// export function RegistrationFormClientUser({ employee, method, user, positions }: {
//     user: UserClient
//     employee?: TEmployeeDB,
//     positions: Positions[]
//     method: "POST" | 'PUT',
// }) {
//     const router = useRouter();
//     const { pending } = useFormStatus()
//     const { previewImage, handleImageChange } = useFormImage(employee?.img)
//     const methods = useForm<RegistrationUserCreateClient>({
//         resolver: zodResolver(registrationCreateClientUser),
//         defaultValues: employee
//             ? {
//                 ...employee,
//                 userId: undefined,
//                 hireDate: employee ? formDate(employee.hireDate) : formDate(new Date()),
//                 dateOfBirth: employee ? formDate(employee.dateOfBirth) : formDate(new Date)
//             } : {
//                 userName: user.userName,
//                 email: user.email,
//                 phone: user.phone,
//             }
//     });
//
//     const { registerAction, handleSubmit, formState: { errors } } = methods
//
//     const onSubmit = async (prevData: RegistrationUserCreateClient) => {
//         await onAction(() => {
//                 onUpsertDataUserAction(method, prevData, employee?.id,
//                     user)
//             },
//             'Success Create Data Employee')
//         router.replace('/home');
//     }
//     return (
//         <div className="container mx-auto p-4 pb-20">
//             <FormProvider { ...methods }>
//                 <form onSubmit={ handleSubmit(onSubmit) } className="space-y-4">
//                     <input type="hidden" { ...registerAction('userId', {
//                         value: user.id
//                     }) } />
//                     <input type="hidden"{ ...registerAction('status', {
//                         value: employee?.status ?? 'Pending'
//                     }) } />
//                     {/*// defaultValue={ new Date().toISOString().split('T')[0] }*/ }
//                     {/*        // .toISOString().split('T')[0],*/ }
//                     <input type="hidden"{ ...registerAction('hireDate', {
//                         value: employee?.hireDate ?? new Date(),
//                         valueAsDate: true
//                     }) } />
//                     <input type="hidden"{ ...registerAction('salary', {
//                         valueAsNumber: true,
//                         value: employee?.salary ?? 0
//                     }) } />
//
//                     <div className="form-control">
//                         <title className="title">
//                             <span className="title-text">Name</span>
//                         </title>
//                         <input
//
//                             type="text"
//                             { ...registerAction('userName', {
//                                 value: user.userName,
//                                 disabled: true
//                             }) }
//                             className={ `input input-bordered ${ errors.userName ? 'input-errors' : '' }` }
//                             placeholder="Employee Name"
//                         />
//                         { errors.userName && <p className="text-errors text-sm mt-1">{ errors.userName.message }</p> }
//                     </div>
//
//                     <div className="form-control">
//                         <title className="title">
//                             <span className="title-text">Email</span>
//                         </title>
//                         <input
//                             type="email"
//                             { ...registerAction('email', {
//                                     disabled: true
//                                 }
//                             ) }
//                             className={ `input input-bordered ${ errors.email ? 'input-errors' : '' }` }
//                             placeholder="employee@company.com"
//                         />
//                         { errors.email && <p className="text-errors text-sm mt-1">{ errors.email.message }</p> }
//                     </div>
//
//                     <div className="form-control">
//                         <title className="title">
//                             <span className="title-text">Phone</span>
//                         </title>
//                         <input
//                             type="tel"
//                             { ...registerAction('phone', {
//                                     disabled: true
//                                 }
//                             ) }
//                             className="input input-bordered"
//                             placeholder="Phone Number"
//                         />
//                         { errors.phone && <p className="text-errors text-sm mt-1">{ errors.phone.message }</p> }
//                     </div>
//
//                     <div className="form-control">
//                         <title className="title">
//                             <span className="title-text">Gender</span>
//                         </title>
//
//                         <select
//                             { ...registerAction('gender') }
//                             className={ `select select-bordered ${ errors.gender ? 'select-errors' : '' }` }
//                         >
//                             <option value="">Select Gender</option>
//                             <option value="Male">Male</option>
//                             <option value="Female">Female</option>
//                         </select>
//                         { errors.gender && <p className="text-errors text-sm mt-1">{ errors.gender.message }</p> }
//                     </div>
//
//                     {/*// console.log(employee.dateOfBirth)*/ }
//                     {/*// Wed Aug 31 1988 07:00:00 GMT+0700 (Indochina Time)*/ }
//                     <div className="form-control">
//                         <title className="title">
//                             <span className="title-text">Date of Birth</span>
//                         </title>
//                         <input
//                             type="date"
//                             { ...registerAction('dateOfBirth',
//                             ) }
//                             className="input input-bordered"
//                             defaultValue={ employee ? new Date(employee.dateOfBirth).toISOString().split('T')[0] : '' }
//                         />
//                         { errors.dateOfBirth &&
//                             <p className="text-errors text-sm mt-1">{ errors.dateOfBirth.message }</p> }
//
//                     </div>
//
//                     {/*<div className="form-control">*/ }
//                     {/*    <title className="title">*/ }
//                     {/*        <span className="title-text">Hire Date</span>*/ }
//                     {/*    </title>*/ }
//                     {/*    <input*/ }
//                     {/*        type="date"*/ }
//                     {/*        {...registerAction('hireDate')}*/ }
//                     {/*        className="input input-bordered"*/ }
//                     {/*    />*/ }
//                     {/*    {errors.hireDate && <p className="text-errors text-sm mt-1">{errors.hireDate.message}</p>}*/ }
//                     {/*</div>*/ }
//
//                     <div className="form-control">
//                         <title className="title">
//                             <span className="title-text">Job Title</span>
//                         </title>
//                         <input
//                             type="text"
//                             { ...registerAction('jobTitle') }
//                             className={ `input input-bordered ${ errors.jobTitle ? 'input-errors' : '' }` }
//                             placeholder="Job Title"
//                         />
//                         { errors.jobTitle && <p className="text-errors text-sm mt-1">{ errors.jobTitle.message }</p> }
//                     </div>
//
//                     <div className="form-control">
//                         <title className="title">
//                             <span className="title-text">Position</span>
//                         </title>
//
//                         <select
//                             { ...registerAction('positions') }
//                             className={ `select select-bordered ${ errors.gender ? 'select-errors' : '' }` }
//                         >
//                             <option value="">Select Position</option>
//                             { positions.map(item => (
//                                 <option key={ item.id } value={ item.position }>{ item.position }</option>
//                             )) }
//                         </select>
//                         { errors.positions
//                             && <p className="text-errors text-sm mt-1">{ errors.positions.message }</p>
//                         }
//                     </div>
//
//                     {/*<div className="form-control">*/ }
//                     {/*    <title className="title">*/ }
//                     {/*        <span className="title-text">Salary</span>*/ }
//                     {/*    </title>*/ }
//                     {/*    <input*/ }
//                     {/*        type="number"*/ }
//                     {/*        { ...registerAction('salary', { valueAsNumber: true }) }*/ }
//                     {/*        className={ `input input-bordered ${ errors.salary ? 'input-errors' : '' }` }*/ }
//                     {/*        placeholder="Salary"*/ }
//                     {/*    />*/ }
//                     {/*    { errors.salary && <p className="text-errors text-sm mt-1">{ errors.salary.message }</p> }*/ }
//                     {/*</div>*/ }
//
//                     <div className="form-control">
//                         <title className="title">
//                             <span className="title-text">Address</span>
//                         </title>
//                         <input
//                             type="text"
//                             { ...registerAction('address',
//                             ) }
//                             className="input input-bordered"
//                             placeholder="Street Address"
//                         />
//                         { errors.address && <p className="text-errors text-sm mt-1">{ errors.address.message }</p> }
//
//                     </div>
//
//                     <div className="form-control">
//                         <title className="title">
//                             <span className="title-text">City</span>
//                         </title>
//                         <input
//                             type="text"
//                             { ...registerAction('city') }
//                             className="input input-bordered"
//                             placeholder="City"
//                         />
//                         { errors.city && <p className="text-errors text-sm mt-1">{ errors.city.message }</p> }
//
//                     </div>
//
//                     <div className="form-control">
//                         <title className="title">
//                             <span className="title-text">Postal Code</span>
//                         </title>
//                         <input
//                             type="text"
//                             { ...registerAction('postalCode') }
//                             className="input input-bordered"
//                             placeholder="Postal Code"
//                         />
//                         { errors.postalCode &&
//                             <p className="text-errors text-sm mt-1">{ errors.postalCode.message }</p> }
//                     </div>
//
//                     <div className="form-control">
//                         <title className="title">
//                             <span className="title-text">Country</span>
//                         </title>
//                         <input
//                             { ...registerAction('country') }
//                             className="input input-bordered"
//                             placeholder="Additional notes"
//                         />
//                         { errors.country && <p className="text-errors text-sm mt-1">{ errors.country.message }</p> }
//                     </div>
//
//                     <div className="form-control">
//                         <title className="title">
//                             <span className="title-text">Work Time</span>
//                         </title>
//                         <select { ...registerAction("workTime") } className="select select-bordered">
//                             <option value="">Select Type</option>
//                             <option value="Full-Time">Full-Time</option>
//                             <option value="Part-Time">Part-Time</option>
//                         </select>
//                         { errors.workTime &&
//                             <p className="text-errors text-sm mt-1">{ errors.workTime.message }</p> }
//                     </div>
//
//                     <div className="form-control">
//                         <title className="title">
//                             <span className="title-text">Notes</span>
//                         </title>
//                         <textarea
//                             { ...registerAction('notes') }
//                             className="textarea textarea-bordered"
//                             placeholder="Additional notes"
//                         ></textarea>
//                         { errors.notes && <p className="text-errors text-sm mt-1">{ errors.notes.message }</p> }
//                     </div>
//
//                     <EmployeeFormContextClientAdmin keys={ 'educations' } title={ 'Education' } />
//                     <EmployeeFormContextClientAdmin keys={ 'skills' } title={ 'Skills' } />
//                     <EmployeeFormContextClientAdmin keys={ 'languages' } title={ 'Languages' } />
//                     {/*<EmployeeFormContextClientAdmin keys={ 'certifications' } title={ 'Certifications' }/>*/ }
//                     {/*<EmployeeFormContextClientAdmin keys={ 'projects' } title={ 'Projects' }/>*/ }
//
//                     <div className="form-control">
//                         <title className="title">
//                             <span className="title-text">Employee Image</span>
//                         </title>
//                         <input
//                             type="file"
//                             {
//                                 // @ts-ignore
//                                 ...registerAction('img') }
//                             onChange={ handleImageChange } // Handle image preview
//                             className="file-input file-input-bordered w-full"
//                         />
//                         {/* @ts-ignore */
//                             errors.img && <p className="text-errors text-sm mt-1">{ errors.img.message }</p> }
//                         {/*  @next/next/no-img-element */ }
//                         <img src={ previewImage }
//                              alt="Image Employee"
//                              className="size-40 mt-2 rounded-lg border"
//                         />
//                     </div>
//
//                     <div className="form-control mt-6">
//                         <button
//                             type="submit"
//                             className="btn btn-primary"
//                             disabled={ pending }
//                         >
//                             Submit Employee
//                         </button>
//                     </div>
//                 </form>
//             </FormProvider>
//         </div>
//     );
// }
