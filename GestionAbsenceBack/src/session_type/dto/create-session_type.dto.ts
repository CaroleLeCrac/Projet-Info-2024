export type CreateSessionTypeDto = {
    id: number;
    course_material_id: number;
    course_type_name: string;
    nb_repetitions: number;
    full_promo: boolean;
}