import React from 'react'

const Course = ({ course }) => {

    let totalExercises = course['parts'].reduce((sum, current) => sum + current.exercises, 0)
    return (
        <div>
            <h2>{course['name']}</h2>

            {course['parts'].map(parts => 
                <p key={parts.id}>
                    {parts.name} {parts.exercises}
                </p>
            )}

            <p className="total">
                Total of {totalExercises} exercises
            </p>
        </div>
    )
}

export default Course